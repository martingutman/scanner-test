document.addEventListener("DOMContentLoaded", function () {
    const responseElement = document.getElementById("response");
    const imageListContainer = document.getElementById("imageList");

    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        AppInstId: "8a5c90a4-5ee1-4dcf-95cc-8e6c27e01dd1",
    };

    const url = "https://192.168.101.1/";

    const imagesArray = [];

    const requests = {
        connect: {
            url: url + "connect",
            method: "GET",
            headers: headers,
        },
        disconnect: {
            url: url + "disconnect",
            method: "GET",
            headers: headers,
        },
        time: {
            url: url + "time",
            method: "GET",
            headers: headers,
        },
        scan: {
            url: url + "scan",
            method: "GET",
            headers: headers,
        },
        currentdevicestateex: {
            url: url + "currentdevicestateex",
            method: "GET",
            headers: headers,
        },
        stop: {
            url: url + "stop",
            method: "GET",
            headers: headers,
        },
    };

    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("fetchButton")) {
            const requestType = event.target.dataset.requestType;
            if (requestType && requests[requestType]) {
                makeRequest(requests[requestType]);
            }
        }
    });

    function makeRequest(requestConfig) {
        responseElement.innerHTML = "Loading the response...";

        /*
            imagesArray.push({
                front: 'https://picsum.photos/id/237/200/300',
                rear: 'https://picsum.photos/seed/picsum/200/300'
            })
            updateImageList();
            */

        fetch(requestConfig.url, {
            method: requestConfig.method,
            headers: requestConfig.headers,
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
                responseElement.innerHTML = data;

                if (requestConfig === requests.currentdevicestateex) {
                    if (
                        data.Documents &&
                        Array.isArray(data.Documents) &&
                        data.Documents.length > 0
                    ) {
                        const validObjects = data.Documents.filter(
                            (obj) => obj.FrontImage1 && obj.RearImage1
                        );

                        validObjects.forEach((obj) => {
                            imagesArray.push({
                                front: url + obj.FrontImage1,
                                rear: url + obj.RearImage1,
                            });
                        });

                        console.log("Images Array:", imagesArray);
                        updateImageList();
                    }
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                responseElement.innerHTML =
                    "Error occurred. Check the console for details.";
            });
    }

    function updateImageList() {
        imageListContainer.innerHTML = "";

        imagesArray.forEach((imageObj) => {
            const rowContainer = document.createElement("div");
            rowContainer.classList.add("image-row");

            const frontImageElement = createImageElement(imageObj.front);
            const rearImageElement = createImageElement(imageObj.rear);

            rowContainer.appendChild(frontImageElement);
            rowContainer.appendChild(rearImageElement);

            imageListContainer.appendChild(rowContainer);
        });
    }

    function createImageElement(imageSrc) {
        const imageElement = document.createElement("img");
        imageElement.src = imageSrc;
        imageElement.alt = "Image";

        return imageElement;
    }
});
