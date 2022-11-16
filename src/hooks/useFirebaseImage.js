import { useState } from "react";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

// Hook nhận vào 2 tham số là setValue, getValues đề handle phần react-hook-form
export default function useFirebaseImage( setValue, getValues, imageName = null, cb ) {
  const [progressState, setProgressState] = useState(0); // Thanh Progress
  const [image, setImage] = useState(""); // State image

  const handleUpLoadImage = (file) => {
    // Đọc document firebase upload
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name); // Thư mục images trong firebase/storage để lưu các hình ảnh upload lên
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + " % done");
        setProgressState(progress);
        // Trạng thái khi upload hình ảnh
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Hello Upload Image");
        }
      },
      // Trường hợp lỗi
      (error) => {
        switch (error.code) {
          // Chưa có quyền
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          // Người dùng cancel khi đang trong quá trình upload
          case "storage/canceled":
            // User canceled the upload
            break;
          default:
            break;
        }
      },
      // Khi upload thành công thì có url ảnh
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  // Handle select image 
  const onSelectImage = (e) => {
    const file = e.target.files[0];
    // console.log(file); // Thông tin image được upload lên
    if (!file) return; // Nếu không có image thì không làm gì cả
    setValue("image_name", file.name);
    handleUpLoadImage(file); // change là lưu vào storage của firebase luôn
  };
  // Delete image
  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + (imageName || getValues("image_name")));
    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        // File deleted successfully
        setImage("");
        setProgressState(0);
        cb && cb(); // Nếu có callback thì thực hiện callback đó
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };
  const handleResetImage = () => {
    setImage("");
    setProgressState(0);
  }

  return {
    image,
    setImage,
    handleResetImage,
    progressState,
    handleUpLoadImage,
    onSelectImage,
    handleDeleteImage
  }
}
