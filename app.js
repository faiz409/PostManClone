// Utility functions:
// 1. Utility functions to get DOM element from string.
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}



// Initialize no. of parameters.
let addedParamCount = 0;

// Hide the parameters box initially.
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If the user clicks on params box, hide the json box.

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'block';
    document.getElementById('requestJsonBox').style.display = 'none';
});

// If the user clicks on json box, hide the params box.

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
});

// If user clicks on + button, add more parameters.
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = ` <div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control paraKey" id="parameterKey${addedParamCount + 2}" placeholder="Enter parameter ${addedParamCount + 2} Key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control paraValue" id="parameterValue${addedParamCount + 2}" placeholder="Enter parameter ${addedParamCount + 2} Value">
                        </div>
                        <buttton class="btn btn-primary deleteParam">-</buttton>
                    </div>`;

    // Convert the element string to DOM node.
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // Add an event listener to remove the parameter on clicking - button.
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    }
    addedParamCount++;
});

// If user clicks on submit button.
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user.
    document.getElementById('responseJsonText').value = "Please wait fetching response...";

    // Fetch all the values user has entered.
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

  
    // If user has used params option insted of json, collect all the parameters in an object.
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }

    else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for debugging.
    console.log("url is " + url);
    console.log("Request is " + requestType);
    console.log("content is " + contentType);
    console.log("data is " + data);

    // If request type is GET, invoke fetch api to create a post request.
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
    }

});