import Header from "@/components/Header";
import ImageDialog from "@/components/ImageDialog";
import { userFromRedux } from "@/redux/userSlice";
import HouseService from "@/services/houseService";
import { PlusCircleIcon } from "@heroicons/react/solid";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function Create({ cities, categories }) {
  const user = useSelector(userFromRedux);

  const houseService = new HouseService();

  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedImageUrls, setSelectedImageUrls] = useState([]);
  const [selectedImageForDetail, setSelectedImageForDetail] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const fileRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let formData = new FormData();

    let house = {
      capacity: data.capacity,
      price: data.price,
      location: location,
      address: data.address,
      city: selectedCity,
      category: selectedCategory,
    };

    const json = JSON.stringify(house);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("house", blob);
    selectedImageFiles.forEach((imageFile) =>
      formData.append("multipartFile", imageFile)
    );

    houseService.save(formData, user?.accessToken);
  };

  const selectImageUrl = (e) => {
    if (e.target.files) {
      setSelectedImageFiles(Array.from(e.target.files));

      const imagesUrlArray = Array.from(e.target.files).map((image) => {
        return URL.createObjectURL(image);
      });

      setSelectedImageUrls((previousImageUrls) =>
        previousImageUrls.concat(imagesUrlArray)
      );
    }
  };

  const handleSelectCity = (cityId) => {
    let selectedCity = cities.filter((city) => city.cityId == cityId)[0];
    setSelectedCity(selectedCity);
  };

  const handleSelectCategory = (categoryId) => {
    let category = categories.filter(
      (item) => item.categoryId == categoryId
    )[0];
    setSelectedCategory(category);
  };

  function closeModal() {
    setIsOpen(false);
    const imageList = selectedImageUrls.filter(
      (image) => image !== selectedImageForDetail
    );
    setSelectedImageUrls(imageList);
  }

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
              What is the category of your house?
            </label>
            <select
              className="formInput px-2"
              onChange={(e) => {
                handleSelectCategory(e.target.value);
              }}
            >
              {categories?.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
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
            <p className="text-[#ed6172] font-semibold px-2">
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
            <p className="text-[#ed6172] font-semibold px-2">
              {errors.address?.message}
            </p>
          </div>

          <div className="flex flex-col p-3 pb-5">
            <label className="text-start mx-auto text-gray-500">
              Choose images of your house.
            </label>

            {!selectedImageUrls.length > 0 ? (
              <img
                src={
                  "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
                }
                className="w-52 object-cover mt-5 mx-auto cursor-pointer"
                onClick={() => fileRef.current.click()}
              />
            ) : (
              <PlusCircleIcon
                className="w-10 cursor-pointer hover:scale-105 transform transition-all duration-150 ease-in-out"
                color="#14b8a5"
                onClick={() => fileRef.current.click()}
              />
            )}
          </div>

          {selectedImageUrls.length > 0 && (
            <div
              className="max-w-7xl mx-auto flex flex-row space-x-3
              overflow-x-scroll px-8 py-3 scrollbar-thin scrollbar-thumb-teal-600"
            >
              {selectedImageUrls?.map((image) => (
                <img
                  className="w-52 object-cover mt-5 cursor-pointer"
                  key={image}
                  src={image}
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedImageForDetail(image);
                  }}
                />
              ))}
            </div>
          )}

          <button
            className="px-10 py-3 bg-teal-400 rounded-lg mx-auto
            text-lg font-semibold shadow-md hover:shadow-lg hover:bg-teal-100"
            type="submit"
          >
            Save House
          </button>
        </form>

        <input
          ref={fileRef}
          hidden
          multiple
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={selectImageUrl}
        />
      </div>

      {isOpen && (
        <ImageDialog
          imageUrl={selectedImageForDetail}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const cities = await fetch("http://localhost:8080/cities/getall").then(
    (res) => res.json()
  );

  const categories = await fetch(
    "http://localhost:8080/categories/getall"
  ).then((res) => res.json());

  return {
    props: {
      cities,
      categories,
    },
  };
}

export default Create;
