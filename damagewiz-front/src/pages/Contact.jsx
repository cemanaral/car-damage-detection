import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
function Contact() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return (
    <div>
      <Icon
        icon="material-symbols:arrow-back-ios-new-rounded"
        color="white"
        width="2rem"
        height="2rem"
        className="absolute top-8 left-8 bg-black/30 rounded-full w-12 h-12 p-2"
        onClick={handleClick}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-12 place-content-center ">
        <div className="xs:w-96 xs:ml-auto xs:mr-16 mt-20 bg-black/30 flex-column p-6 rounded-xl backdrop-blur ">
          <h1 className="text-white text-2xl text-center">Contact</h1>
          <div className="flex mt-12 space-x-4">
            <Icon
              icon="ic:baseline-person"
              color="white"
              height="4rem"
              width="4rem"
            />
            <div>
              <p className="text-white text-lg mt-2"> Melisa Durmuş </p>
              <div className="flex gap-2">
                <Icon
                  icon="tabler:mail"
                  color="white"
                  className="self-center"
                  height="1.5rem"
                  width="1.5rem"
                />
                <p className="text-white"> melisadrmuss@gmail.com </p>
              </div>
            </div>
          </div>
          <div className="flex mt-12 space-x-4">
            <Icon
              icon="ic:baseline-person"
              color="white"
              height="4rem"
              width="4rem"
            />
            <div>
              <p className="text-white text-lg mt-2"> Hasan Şenyurt </p>
              <div className="flex gap-2">
                <Icon
                  icon="tabler:mail"
                  color="white"
                  className="self-center"
                  height="1.5rem"
                  width="1.5rem"
                />
                <p className="text-white"> yhsenyurt@gmail.com </p>
              </div>
            </div>
          </div>
          <div className="flex mt-12 space-x-4">
            <Icon
              icon="ic:baseline-person"
              color="white"
              height="4rem"
              width="4rem"
            />
            <div>
              <p className="text-white text-lg mt-2"> Cem Anaral </p>
              <div className="flex gap-2">
                <Icon
                  icon="tabler:mail"
                  color="white"
                  className="self-center"
                  height="1.5rem"
                  width="1.5rem"
                />
                <p className="text-white"> cemanaral@hotmail.com </p>
              </div>
            </div>
          </div>
        </div>
        <div className="xs:w-96 xs:ml-auto xs:mr-16 mt-20 bg-black/30 flex-column p-6 rounded-xl backdrop-blur ">
          <h1 className="text-white text-2xl text-center">Who are we?</h1>
          <p className="text-white mt-12">
            We are a group of students from the Marmara University. We are
            currently in the 4rd grade of our studies and are working on a
            project for the course "cse4178". The project's goal is to create an
            app for finding the damages of the vehicles from the photos you
            upload.
          </p>
        </div>
        <div className="xs:w-96 xs:ml-auto xs:mr-16 mt-20 bg-black/30 flex-column p-6 rounded-xl backdrop-blur">
          <h1 className="text-white text-2xl text-center ">FAQ</h1>
        </div>
      </div>
    </div>
  );
}

export default Contact;
