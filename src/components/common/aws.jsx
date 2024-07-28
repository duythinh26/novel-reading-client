import axios from "axios";

export const uploadImage = async (img) => {
    let imgUrl = null;

    await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
    .then( async ({ data: { uploadURL }}) => { // Destructor upload url
        
        await axios({
            method: 'PUT',
            url: uploadURL,
            headers: {
                'Content-Type': 'image/jpeg'
            },
            data: img,
        })
        .then(() => {
            imgUrl = uploadURL.split("?")[0]
        })
        .catch((err) => {
            console.log("Error during upload: ", err);
        })
    })

    return imgUrl;
}
