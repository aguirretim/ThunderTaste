document.addEventListener('DOMContentLoaded', function () {
    const ingredientsGroup = document.getElementById('ingredients-group');

    const stepsGroup = document.getElementById('steps-group');

    // Add new ingredient input
    document.querySelector('.btn-add-ingredient').addEventListener('click', function () {
        const inputCount = ingredientsGroup.querySelectorAll('.input-wrapper').length;
        const newDiv = document.createElement("div");
        newDiv.className = "input-wrapper";
        newDiv.innerHTML = `
            <input id="ingredients${inputCount + 1}" class="form-control" placeholder="Add another ingredient">
            <svg onclick="removeIngredient(this)" width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="images/icons/icons.svg#circle-x-icon"></use>
            </svg>`;
        ingredientsGroup.appendChild(newDiv);
    });

    // Remove ingredient input
    window.removeIngredient = function (element) {
        if (ingredientsGroup.querySelectorAll('.input-wrapper').length > 1) {
            element.closest('.input-wrapper').remove();
        } else {
            console.log("Cannot remove the last ingredient.");
        }
    };


    // Delegated event for removing ingredient inputs
    ingredientsGroup.addEventListener('click', function (event) {
        let targetElement = event.target;
        // If the clicked element or its parent is an SVG with the circle-x-icon
        if (targetElement.tagName === 'svg' || targetElement.tagName === 'use' || targetElement.closest('svg')) {
            let wrapper = targetElement.closest('.input-wrapper');
            // Check if this is the last ingredient input
            if (wrapper && ingredientsGroup.querySelectorAll('.input-wrapper').length > 1) {
                wrapper.remove();
            } else {
                // Optionally, alert the user or handle differently
                console.log("Cannot remove the last ingredient.");
            }
        }
    });


    // Add new step input
    document.querySelector('.btn-add-step').addEventListener('click', function () {
        const inputCount = stepsGroup.querySelectorAll('.input-wrapper').length;
        const newDiv = document.createElement("div");
        newDiv.className = "input-wrapper";
        newDiv.innerHTML = `
            <textarea id="directions${inputCount + 1}" class="form-control" placeholder="Add another step.."></textarea>
            <svg onclick="removeStep(this)" width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="images/icons/icons.svg#circle-x-icon"></use>
            </svg>`;
        stepsGroup.appendChild(newDiv);
    });

    // Remove step input
    window.removeStep = function (element) {
        if (stepsGroup.querySelectorAll('.input-wrapper').length > 1) {
            element.closest('.input-wrapper').remove();
        } else {
            console.log("Cannot remove the last step.");
        }
    };

    // Delegated event for removing step inputs
    stepsGroup.addEventListener('click', function (event) {
        let targetElement = event.target;
        // If the clicked element or its parent is an SVG with the circle-x-icon
        if (targetElement.tagName === 'svg' || targetElement.tagName === 'use' || targetElement.closest('svg')) {
            let wrapper = targetElement.closest('.input-wrapper');
            // Check if this is the last step input
            if (wrapper && stepsGroup.querySelectorAll('.input-wrapper').length > 1) {
                wrapper.remove();
            } else {
                // Optionally, alert the user or handle differently
                console.log("Cannot remove the last step.");
            }
        }
    });
});


//file upload button
document.getElementById('recipePhoto').addEventListener('change', function () {
    let fileName = this.value.split('\\').pop(); // Extracts file name from full path
    this.nextElementSibling.textContent = fileName ? fileName : 'No file chosen';
});


document.getElementById('prepTimeNumber').addEventListener('input', function () {
    if (parseInt(this.value, 10) < 1) {
        this.value = 1;
    }
});

document.getElementById('cookTimeNumber').addEventListener('input', function () {
    if (parseInt(this.value, 10) < 0) {
        this.value = 1;
    }
});
