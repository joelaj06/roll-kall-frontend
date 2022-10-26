let img64;
const convertImageToBase64 = (e) => {
  let base64String = null;
  if (e.target.files[0].size > 1000000) {
    console.log("File too large");
  } else {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
      const result =  reader.result;
      base64String = result.replace(/^data:image\/[a-z]+;base64,/, "");
     console.log('returning string')
     base64String = img64;
      return base64String;
     
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  
    setTimeout(()=> console.log(img64), 1000)
    return base64String;
  }
};

const getBase64String = (base64String) => {
  console.log(base64String);
  img64 = base64String;
  return base64String;
}

export { convertImageToBase64 };
