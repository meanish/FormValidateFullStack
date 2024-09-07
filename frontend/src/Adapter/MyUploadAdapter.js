import axios from "axios";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file) => {
      return new Promise((resolve, reject) => {
        // Simulate image upload to your backend
        const formData = new FormData();
        formData.append("file", file);

        axios
          .post("/imgupload", formData)
          .then((response) => {
            if (response.data && response.data.url) {
              resolve({ default: response.data.url });
            } else {
              reject("Upload failed no data.url");
            }
          })
          .catch((error) => {
            reject("Upload failed");
          });
      });
    });
  }
}

export default MyUploadAdapter;

// import React from "react";

// class MyUploadAdapter extends React.Component {

//   constructor(props) {
//     super(props);

//     this.xhr = null;

//     this.state = {
//       loader: props.loader,
//     };
//   }

//   componentDidMount() {
//     console.log("State in componentDidMount:", this.state);
//     this.upload();
//   }

//   upload = () => {
//     const { file } = this.state.loader;

//     new Promise((resolve, reject) => {
//       this._initRequest(resolve, reject);
//       this._initListeners(resolve, reject, file);
//       this._sendRequest(file);
//     })
//       .then((response) => {
//         // Handle successful response
//       })
//       .catch((error) => {
//         // Handle error
//       });
//   };

//   _initRequest(resolve, reject) {
//     this.xhr = new XMLHttpRequest();
//     this.xhr.open("POST", "/imgupload", true);
//     this.xhr.responseType = "json";

//     this.xhr.onload = () => {
//       if (this.xhr.status >= 200 && this.xhr.status < 300) {
//         resolve(this.xhr.response);
//       } else {
//         reject(this.xhr.statusText);
//       }
//     };

//     this.xhr.onerror = () => reject(this.xhr.statusText);
//   }

//   _initListeners(resolve, reject, file) {
//     const { loader } = this.state;
//     const genericErrorText = `Couldn't upload file: ${file.name}.`;

//     this.xhr.upload.onprogress = (event) => {
//       this.setState({
//         loader: {
//           ...loader,
//           uploadTotal: event.total,
//           uploaded: event.loaded,
//         },
//       });
//     };

//     this.xhr.onerror = () => reject(genericErrorText);
//     this.xhr.onabort = () => reject();
//     this.xhr.onload = () => {
//       const response = this.xhr.response;

//       if (!response || response.error) {
//         return reject(
//           response && response.error ? response.error.message : genericErrorText
//         );
//       }

//       resolve({
//         default: response.url,
//       });
//     };
//   }

//   _sendRequest(file) {
//     const data = new FormData();
//     data.append("upload", file);
//     this.xhr.send(data);
//   }

//   componentWillUnmount() {
//     if (this.xhr) {
//       this.xhr.abort();
//     }
//   }

//   render() {
//     return null; // This component doesn't render anything visible
//   }
// }

// export default MyUploadAdapter;
