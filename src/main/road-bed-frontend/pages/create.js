import Header from "@/components/Header";
import ImageDialog from "@/components/ImageDialog";
import HouseService from "@/services/houseService";
import UserService from "@/services/userService";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";

function Create({ cities, categories }) {
  const { data: session } = useSession();
  const router = useRouter();

  const houseService = new HouseService(session);
  const userService = new UserService(session);

  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedImageUrls, setSelectedImageUrls] = useState([]);
  const [selectedImageForDetail, setSelectedImageForDetail] = useState();
  const [firstImage, setFirstImage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const fileRef = useRef(null);
  const formBtnRef = useRef(null);

  useEffect(() => {
    userService
      .getByEmail(session?.user?.email)
      .then((res) => setUserInfo(res.data));
  }, []);

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
      description: data.description,
      city: selectedCity,
      category: selectedCategory,
      owner: userInfo,
    };

    const json = JSON.stringify(house);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("house", blob);
    selectedImageFiles.forEach((imageFile) =>
      formData.append("multipartFile", imageFile)
    );
    toast.promise(
      houseService.save(formData).then((res) => {
        if(res.status === 200)
          router.push("/detail/" + res.data.houseId);
      }),
      {
        loading: 'Your house is saving...',
        success: <b>House saved!</b>,
        error: <b>Could not save.</b>,
      },{
        style: {
          border: '1px solid #14b8a5',
          padding: '16px',
          color: '#14b8a5',
        },
        iconTheme: {
          primary: '#14b8a5',
          secondary: '#FFFAEE',
        },
      }
    )
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

      let firstImage = imagesUrlArray[0];
      setFirstImage(firstImage);
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

  const closeModal = () => {
    setIsOpen(false);
  };

  const removeImageModal = () => {
    setIsOpen(false);
    const imageList = selectedImageUrls.filter(
      (image) => image !== selectedImageForDetail
    );
    setSelectedImageUrls(imageList);
  };

  return (
    <div className="relative">
      <Header />
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto my-4">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div>
            <h2 className="text-center text-3xl font-semibold mt-20">
              Save Your House
            </h2>
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
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
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
                  {...register("capacity", {
                    required: "Please enter this field",
                  })}
                  className="formInput "
                  type="number"
                  placeholder="Guest capacity"
                  min={1}
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
              <div className="flex flex-col space-y-2">
                <label className="px-1 text-gray-500">
                  Write small description about your house.
                </label>
                <input
                  {...register("description", {
                    required: "Please enter description",
                  })}
                  className="formInput"
                  type="text"
                  placeholder="Small Description"
                />
                <p className="text-[#ed6172] font-semibold px-2">
                  {errors.address?.message}
                </p>
              </div>

              <button
                ref={formBtnRef}
                className="px-10 py-3 bg-teal-400 rounded-lg mx-auto
                text-lg font-semibold shadow-md hover:shadow-lg hover:bg-teal-100 hidden"
                type="submit"
              >
                Save House
              </button>
            </form>
          </div>

          <div className="">
            <div className="relative flex flex-col p-3 pb-5 mt-5 sm:mt-36">
              <label className="text-start mx-auto sm:mx-0 text-gray-500">
                Choose images of your house.
              </label>

              <img
                src={
                  firstImage ||
                  "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                }
                className="w-96 h-52 object-cover mt-3 mx-auto sm:mx-0 cursor-pointer rounded-lg"
                onClick={() => {
                  if (firstImage) {
                    setIsOpen(true);
                    setSelectedImageForDetail(firstImage);
                  } else {
                    fileRef.current.click();
                  }
                }}
              />

              <PlusCircleIcon
                className="w-10 absolute bottom-0 right-10 sm:right-0 sm:-bottom-2 md:right-6 lg:right-56
                  cursor-pointer hover:scale-105 transform transition-all duration-150 ease-in-out"
                color="#14b8a5"
                onClick={() => fileRef.current.click()}
              />
            </div>

            {selectedImageUrls.length > 0 && (
              <div
                className="max-w-7xl w-96 flex flex-row space-x-3
                overflow-x-scroll mx-auto md:mx-4 py-3 scrollbar-thin scrollbar-thumb-teal-600"
              >
                {selectedImageUrls?.map((image) => (
                  <img
                    className={`w-52 object-cover mt-5 cursor-pointer rounded-lg
                     ${firstImage === image ? "hidden" : "visible"}`}
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

            <div className="text-center md:w-96 md:text-center md:mx-4">
              <button
                className="px-10 py-1 bg-teal-400 rounded-lg mt-5 sm:mt-16
                text-lg font-semibold shadow-md hover:shadow-lg hover:bg-teal-100"
                onClick={() => formBtnRef.current.click()}
              >
                Save
              </button>
            </div>
          </div>
        </div>

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
          removeImageModal={removeImageModal}
          isRemoveBtnExist={true}
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
