import Header from "@/components/Header";
import { userFromRedux } from "@/redux/userSlice";
import HouseService from "@/services/houseService";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const getCities = async () => {
  const result = fetch("http://localhost:8080/cities/getall").then((res) =>
    res.json()
  );
  return result;
};

function Create() {
  const user = useSelector(userFromRedux);

  const [selectedImages, setSelectedImages] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState();

  const fileRef = useRef(null);

  const houseService = new HouseService();

  useEffect(() => {
    getCities().then((res) => setCities(res));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let location = {
      address: data.address,
      city: selectedCity,
    };
    let house = {
      capacity: data.capacity,
      price: data.price,
      location: location,
    };
    houseService.save(house, user?.accessToken);
  };

  const selectImageUrl = (e) => {
    if (e.target.files) {
      Object.keys(e.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          setSelectedImages([...selectedImages, readerEvent.target.result]);
        };
        reader.readAsDataURL(e.target.files[file]);
      });
    }
  };

  const handleSelectCity = (cityId) => {
    let selectedCity = cities.filter((city) => city.cityId == cityId)[0];
    setSelectedCity(selectedCity);
  };

  return (
    <div className="relative">
      <Header />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold mt-20">Save House</h2>
        <form
          className="flex flex-col mx-auto gap-2 w-fit mt-10 space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col space-y-2">
            <label className="px-1 text-gray-500">
              In which city is your house located?
            </label>
            <select
              className="formInput px-2"
              onChange={(e) => {
                handleSelectCity(e.target.value);
              }}
            >
              {cities?.map((city) => (
                <option key={city.cityId} value={city.cityId}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="px-1 text-gray-500">
              How much income do you want to earn?
            </label>
            <input
              {...register("price", { required: "Please enter price" })}
              className="formInput"
              type="number"
              placeholder="Daily Price"
            />
            <p className="text-[#ed6172] font-semibold px-2">
               {errors.price?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="px-1 text-gray-500">
              What is the maximum guest capacity of your house?
            </label>
            <input
              {...register("capacity", { required: "Please enter this field" })}
              className="formInput "
              type="number"
              placeholder="Guest capacity"
            />
            <p className="text-[#007991] font-semibold px-2">
               {errors.capacity?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="px-1 text-gray-500">
              What is the address of the your house?
            </label>
            <input
              {...register("address", {
                required: "Please enter the house address",
              })}
              className="formInput"
              type="text"
              placeholder="Address"
            />
            <p className="text-[#007991] font-semibold px-2">
               {errors.address?.message}
            </p>
          </div>

          <button
            className="px-10 py-3 bg-teal-400 rounded-lg mx-auto
            text-lg font-semibold shadow-md hover:shadow-lg hover:bg-teal-100"
            type="submit"
          >
            Save House
          </button>
        </form>

        <div className="flex flex-col p-3">
          <label className="text-start mx-auto text-gray-500">
            Choose images of your house.
          </label>
          <img
            src={
              "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
            }
            className="w-52 object-cover mt-5 mx-auto"
            onClick={() => fileRef.current.click()}
          />
        </div>

        {selectedImages?.map((image) => (
          <img key={image} src={image} />
        ))}

        <input
          ref={fileRef}
          hidden
          multiple
          type="file"
          onChange={selectImageUrl}
        />
      </div>
    </div>
  );
}

export default Create;
