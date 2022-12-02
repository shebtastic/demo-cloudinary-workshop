import { Image } from "cloudinary-react";
import NextImage from "next/image";

export default function Home({ addImage, images }) {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const response = await fetch("/api/image/upload", {
      method: "POST",
      body: formData,
    });
    const image = await response.json();
    addImage(image);
  }

  return (
    <>
      <h1>cloudinary</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image-upload">File:</label>
        <input id="image-upload" type="file" name="image" />
        <button type="submit">Upload File</button>
      </form>
      {images.map((image) => (
        // <Image
        //   key={image.publicId}
        //   publicId={image.publicId}
        //   alt="hier könnte idee stehen"
        // />
        <NextImage
          key={image.publicId}
          src={image.secureUrl}
          height={100}
          width={100}
        />
      ))}
      {/* <Image publicId="mdybomnrdivrscgwcluc" alt="schreibtischbild" /> */}
    </>
  );
}
