function getValueById(valueId) {
  var inputElement = document.getElementById(valueId);
  var inputValue = inputElement.value;
  //   console.log("Input Value: " + inputValue);
  return inputValue;
}

function getSelectedLabel(name) {
  var radioButtons = document.getElementsByName(name);
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      var labelForRadioButton = document.querySelector(
        'label[for="' + radioButtons[i].id + '"]'
      );
      var selectedLabel = labelForRadioButton.innerText;
      console.log("Selected Label: " + selectedLabel);
      return selectedLabel;
    }
  }
  // Handle the case where no radio button is selected
  console.log("No radio button selected");
  return null;
}

function logFormValues() {
  getValueById("name");
  getValueById("email");
  getSelectedLabel("btnradio");
}

function showLoading() {
  var button = document.getElementById("donatebtn");
  var loader = document.getElementById("loader");
  button.style.display = "none";
  loader.style.display = "block";
}

function hideLoading() {
  var button = document.getElementById("donatebtn");
  var loader = document.getElementById("loader");
  button.style.display = "block";
  loader.style.display = "none";
}
async function postDataToApi(apiEndpoint, postData) {
  // Make a POST request to the API endpoint
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData), // Convert the data to JSON format
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.body}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function postDonationData() {
  const apiEndpoint =
    "https://charity-server-8i5b.onrender.com/api/v1/store-donation";

  const name = getValueById("name");
  const email = getValueById("email");
  const amount = getSelectedLabel("btnradio");

  const postData = {
    name: name,
    email: email,
    amount: amount,
  };

  console.log(postData);
  showLoading();
  postDataToApi(apiEndpoint, postData)
    .then((response) => {
      hideLoading();
      console.log("API Response:", response);
      setTimeout(() => {
        alert(response["message"]);
        location.reload();
      }, 1000);
    })
    .catch((error) => {
      hideLoading();
      console.error("Error in postDataToApi:", error);
    });
}
