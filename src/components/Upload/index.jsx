import React from "react";

const UploadImage = ({
  id = "imgpicker",
  multiple = false,
  accept = "image/png, image/jpg",
  fileMaxSize = 1024,
  handleImageUpload,
}) => {
  const handleImageChange = (e) => {
    var files = e?.target?.files;
    var filesArr = Array.prototype.slice.call(files);

    // var fileMaxSize = 1024 * 5; //1M
    if (files) {
      var size = files.size / 1024;
      filesArr.forEach((element) => {});
      if (size > fileMaxSize) {
        files.value = "";
        window.lz.showPrompt({ type: 0, msg: "Picture size: 5MB(max)" });
      } else {
        handleImageUpload(files);
      }
    }
  };

  return (
    <input
      type="file"
      id={id}
      name="image"
      accept={accept}
      multiple={multiple}
      onChange={handleImageChange}
    />
  );
};

export default UploadImage;
