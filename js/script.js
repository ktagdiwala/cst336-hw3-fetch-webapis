// event listeners
document.addEventListener("DOMContentLoaded", () => displayCountries());
document.querySelector("#submit").addEventListener("click",validateInput);

// functions

// Displaying the list of all country names from Web API
async function displayCountries(){
    let url = `https://restcountries.com/v3.1/all?fields=name`;
    let response = await fetch(url);
    let data = await response.json();
    let countryList = document.querySelector("#country");
    for(let i = 0; i<data.length; i++){
        countryList.innerHTML += `<option value="${data[i].name.official}">${data[i].name.common}</option>`;
    }
    sortList();
}

// sorts the list of countries alphabetically
function sortList() {
    const countryList = document.querySelector("#country");
    const items = Array.from(countryList.options);
  
    items.sort((a, b) => a.text.localeCompare(b.text));
  
    countryList.innerHTML = '<option>Select Country</option>'; // Clear existing options
  
    items.forEach(item => {
      countryList.appendChild(item);
    });

    countryList.focus();
    countryList.selectedIndex = 0;
}

// Validating form data
function validateInput(){
    let isValid = true;
    let country = document.querySelector("#country").value;
    let countryError = document.querySelector("#countryError");
    if(country=="Select Country"){
        countryError.innerHTML = "Please Select a Country to Learn More";
        countryError.style.color = "#EEBBA8";
        countryError.style.fontWeight = "bold";
        isValid = false;
        console.log("sorry, you need an input");
    }

    if(isValid){
        console.log("getting information...");
        displayInfo();
    }
}

async function displayInfo(){
    let country = document.querySelector("#country").value;
    // alert(document.querySelector("#zip").value);
    let url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
    let response = await fetch(url);
    let data = await response.json();
    let countryError = document.querySelector("#countryError");
    // console.log(data);
    if(data==false){
        countryError.innerHTML = "Country does not exist";
        countryError.style.color = "#FDBCB4";
    }else{
        countryError.innerHTML = "";
        document.querySelector("#flag").src = data[0].flags.png;
        document.querySelector("#flag").alt = data[0].flags.alt;
        document.querySelector("#countryName").innerHTML = data[0].name.common;
        document.querySelector("#common").innerHTML = data[0].name.common;
        document.querySelector("#official").innerHTML = data[0].name.official;
        document.querySelector("#capital").innerHTML = data[0].capital;
        document.querySelector("#continents").innerHTML = data[0].continents.join(', ');
        document.querySelector("#latlng").innerHTML = data[0].latlng.join(', ');
        document.querySelector("#timezones").innerHTML = data[0].timezones.join(', ');
        // document.querySelector("#currency").innerHTML = Object.keys(data[0].currencies).join(', ');
        // Extract and display currency name and symbol
        let currencies = data[0].currencies; 
        let currencyList = ''; 
        for (let key in currencies) { 
            if (currencies.hasOwnProperty(key)) { 
                let currency = currencies[key]; 
                currencyList += `${currency.name} (${currency.symbol}) `; 
            } 
        } 
        document.querySelector("#currency").innerHTML=currencyList;
        document.querySelector("#languages").innerHTML = Object.values(data[0].languages).join(', ');
        document.querySelector("#population").innerHTML = data[0].population;
    }
}