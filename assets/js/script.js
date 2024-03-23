function addUploadedItem(fileName, index) {
    console.log(`Adding uploaded item: ${fileName}, index: ${index}`);
    var itemDiv = document.createElement('div');
    itemDiv.className = 'row';
    itemDiv.innerHTML = `
                        <div class="d-flex border w-75 mx-3" id="uploaded-item-${index}">
                            <span class="text-danger">${fileName}</span>
                            <span class="px-3"><button class="delete-button" onclick="deleteItem(this, ${index})">x</button></span>
                       </div> `;
    var previousItem = document.getElementById(`uploaded-item-${index}`);
    if (previousItem) {
        console.log(`Previous item found: ${previousItem}`);
        previousItem.replaceWith(itemDiv);
    } else {
        console.log(`Previous item not found, inserting at: file${index}`);
        document.getElementById(`file${index}`).replaceWith(itemDiv);
    }
}

function getSmallTagId(index) {
    return `file${index}`;
}

function deleteItem(button, index) {
    console.log(`Deleting item at index: ${index}`);
    button.parentNode.parentNode.remove();
    var input = document.getElementById(`photo${index}`);
    input.removeEventListener('change', handleFileChange);
    var smallTag = document.createElement('small');
    smallTag.id = getSmallTagId(index);
    smallTag.className = getSmallTagId(index);
    smallTag.setAttribute('role', 'alert');
    smallTag.innerText =
        "Note: Image size should be 300x300 and file size should be 100 KB";
    document.getElementById(getSmallTagId(index)).appendChild(smallTag);
    input.value = ""; // Clear file input
    input.addEventListener('change', handleFileChange);
}

// Function to handle file change
function handleFileChange() {
    var index = parseInt(this.id.replace('photo', ''));
    if (this.files && this.files[0]) {
        addUploadedItem(this.files[0].name, index);
    }
}

// Listen for change event on file input
document.querySelectorAll('.file').forEach(function (input) {
    input.addEventListener('change', handleFileChange);
});

function saveData() {
    var formData = {
        "verificationType": getRadioValue('verification-type'),
        "passportNumber": getElementValue("Passport"),
        "nocMarkNumber": getElementValue("verification-type-1"),
        "prabasi-parents-name-english": getElementValue("prabasi-parents-name-english"),
        "relation": getElementValue("relation"),
        "noc-mark-number": getElementValue("noc-mark-number"),
        "working-country": getElementValue("working-country"),
        "number": getElementValue("national-id-passport"),
        "country": getElementValue("country"),
        "nameBengali": getElementValue("name-bengali"),
        "nameEnglishi": getElementValue("name-english"),
        "dateOfBirth": getElementValue("date-of-birth"),
        "age": getElementValue("age"),
        "fatherNameBengali": getElementValue("father-name-bengali"),
        "fatherNameEnglish": getElementValue("father-name-english"),
        "motherNameBengali": getElementValue("mother-name-bengali"),
        "motherNameEnglish": getElementValue("mother-name-english"),
        "guardianName": getElementValue("guardian-name"),
        "guardianRelationship": getElementValue("guardian-relationship"),
        "guardianMobile1": getElementValue("guardian-mobile-1"),
        "guardianMobile2": getElementValue("guardian-mobile-2"),
        "nationalIdPassport": getElementValue("national-id-passport"),
        "disabilityType": getElementValue("disability-type"),
        "currentAddressStreet": getElementValue("current-address-street"),
        "currentAddressDistrict": getElementValue("current-address-district"),
        "currentAddressSubdistrict": getElementValue("current-address-subdistrict"),
        "currentAddressPostOffice": getElementValue("current-address-postoffice"),
        "currentAddressPostcode": getElementValue("current-address-postcode"),
        "permanentAddressStreet": getElementValue("permanent-address-street"),
        "permanentAddressDistrict": getElementValue("permanent-address-district"),
        "permanentAddressSubdistrict": getElementValue("permanent-address-subdistrict"),
        "permanentAddressPostOffice": getElementValue("permanent-address-postoffice"),
        "permanentAddressPostcode": getElementValue("permanent-address-postcode"),
        "accountHolderName": getElementValue("account-holder-name"),
        "accountNumber": getElementValue("account-number"),
        "routingNumber": getElementValue("routing-number"),

        "attachments": {
            "candidate-photo": getFileValue("candidate-photo"),
            "expatriate-passport": getFileValue("expatriate-passport"),
            "BMET-clearance": getFileValue("BMET-clearance"),
            "NOC-issued-by-tabas": getFileValue("NOC-issued-by-tabas"),
            "certificate-Wage-pdf": getFileValue("certificate-Wage-pdf"),
            "suvarna-ID-pdf": getFileValue("suvarna-ID-pdf"),
            "disability-certificate": getFileValue("disability-certificate"),
            "citizenship-certificate": getFileValue("citizenship-certificate"),
            "guardian-signature": getFileValue("guardian-signature"),
            "bank-statement": getFileValue("bank-statement")
        }
    };


    var jsonData = JSON.stringify(formData);

    localStorage.setItem("formData", jsonData);

    alert("Form data saved to local storage.");
}

function getRadioValue(name) {
    var radios = document.getElementsByName(name);
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return null;
}

function getElementValue(id) {
    var element = document.getElementById(id);
    return element ? element.value : null;
}

function getFileValue(id) {
    var fileInput = document.getElementById(id);
    return fileInput ? fileInput.files[0] : null;
}

window.location.href =
    `./print.html?${Object.keys(attachments).map(key => `${key}=${encodeURIComponent(attachments[key])}`).join('&')}`;

function nextStep(step) {
    $('#step-' + step).removeClass('active');
    $('#step-' + (step + 1)).addClass('active');
    $('a[href="#step-' + (step + 1) + '"]').tab('show');
}


function prevStep(step) {
    $('#step-' + step).removeClass('active');
    $('#step-' + (step - 1)).addClass('active');
    $('a[href="#step-' + (step - 1) + '"]').tab('show');
}

function handleNavClick(step) {
    if (step !== currentStep) {
        return false;
    }
    disableNavLinks(step);
    return true;
}

function validateForm(step) {
    const form = document.getElementById('multi-step-form');
    const inputs = form.querySelectorAll('#step-' + step + ' input[required], #step-' + step +
        ' textarea[required]');
    let isValid = true;
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
            input.reportValidity();
        }
    });
    return isValid;
}
$('#multi-step-form').submit(function (e) {
    e.preventDefault();
});