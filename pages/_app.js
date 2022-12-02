import { CloudinaryContext } from "cloudinary-react";
import { useLocalStorage } from "../helpers/hooks";

function MyApp({ Component, pageProps }) {
  const [images, setImages] = useLocalStorage("images", []);

  function addImage(image) {
    setImages((oldImages) => [...oldImages, image]);
  }

  return (
    <CloudinaryContext cloudName="dedmqbztv">
      <Component {...pageProps} images={images} addImage={addImage} />
    </CloudinaryContext>
  );
}

export default MyApp;
