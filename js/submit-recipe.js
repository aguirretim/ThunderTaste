// Event listener to ensure the DOM is fully loaded before running the script.
document.addEventListener('DOMContentLoaded', function () {
    setupInputValidationHandlers(); 
    setupIngredientStepHandlers();
    setupFileUploadHandler();
    setupTimeInputHandlers();
    setupFormSubmissionHandler();
    initializeInputValidationListeners();
});

// Setup validation handlers for recipe title and description.
function setupInputValidationHandlers() {
    // Setup for Recipe Title and Description
    const recipeTitle = document.getElementById('recipeTitle');
    const description = document.getElementById('description');

    if (recipeTitle) {
        recipeTitle.addEventListener('input', validateRecipeTitle);
    }

    if (description) {
        description.addEventListener('input', validateDescription);
    }
}
// Sets up handlers for adding ingredients and steps to the recipe.
function setupIngredientStepHandlers() {
    const ingredientsGroup = document.getElementById('ingredients-group');
    const stepsGroup = document.getElementById('steps-group');

    // Add button click event listeners to add new ingredient/step inputs.

    document.querySelector('.btn-add-ingredient').addEventListener('click', function () {
        addIngredientInput(ingredientsGroup);
    });

    document.querySelector('.btn-add-step').addEventListener('click', function () {
        addStepInput(stepsGroup);
    });

    // Attach event listeners to initial ingredient and step inputs
    initializeInputValidationListeners();
}

// Functions for adding new ingredient and step inputs.
function addIngredientInput(parentGroup) {
    const inputCount = parentGroup.querySelectorAll('.input-wrapper').length;
    const newDiv = createInputDiv(inputCount + 1, 'ingredient', validateIngredient);
    parentGroup.appendChild(newDiv);
}

function addStepInput(parentGroup) {
    const inputCount = parentGroup.querySelectorAll('.input-wrapper').length;
    const newDiv = createInputDiv(inputCount + 1, 'step', validateStep);
    parentGroup.appendChild(newDiv);
}
// Creates a new input div and attaches necessary validation.
function createInputDiv(count, type, validateFunction) {
    const newDiv = document.createElement("div");
    newDiv.className = "input-wrapper";

    if (type === 'ingredient') {
        newDiv.innerHTML = `<input id="ingredients${count}" class="form-control" placeholder="Add another ingredient">`;
    } else { // type === 'step'
        newDiv.innerHTML = `<textarea id="directions${count}" class="form-control" placeholder="Add another step.."></textarea>`;
    }

    newDiv.innerHTML += `
        <svg onclick="removeInput(this)" width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use xlink:href="images/icons/icons.svg#circle-x-icon"></use>
        </svg>`;

    const newInput = newDiv.querySelector(type === 'ingredient' ? 'input' : 'textarea');
    newInput.addEventListener('input', () => validateFunction(newInput));
    return newDiv;
}
// Allows for removal of dynamically added input fields.
window.removeInput = function (element) {
    
    // Adjust the selector based on your actual DOM structure
    const wrapper = element.closest('.input-wrapper');

    if (!wrapper) {
        console.error("Could not find input wrapper. Incorrect element passed to removeInput?", element);
        return;
    }

    const parentGroup = wrapper.parentNode;

    // Additional check for null
    if (parentGroup && parentGroup.querySelectorAll('.input-wrapper').length > 1) {
        wrapper.remove();
    } else {
        console.log("Cannot remove the last item.");
    }
};
// Sets up change event listener for file uploads.
function setupFileUploadHandler() {
    document.getElementById('recipePhoto').addEventListener('change', function () {
        let fileName = this.value.split('\\').pop();
        this.nextElementSibling.textContent = fileName ? fileName : 'No file chosen';
    });
}
// Input handlers for time inputs to ensure valid number entry
function setupTimeInputHandlers() {
    document.getElementById('prepTimeNumber').addEventListener('input', function () {
        this.value = parseInt(this.value, 10) < 1 ? 1 : this.value;
    });

    document.getElementById('cookTimeNumber').addEventListener('input', function () {
        this.value = parseInt(this.value, 10) < 0 ? 1 : this.value;
    });
}

// Handles the form submission event.
function setupFormSubmissionHandler() {
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        let isFormValid = validateRecipeTitle() && validateDescription() && validateIngredients() && validateSteps();
        if (isFormValid) {
            // Perform submission logic here
        }
    });
}

// Validation functions


// Validate the recipe title.
function validateRecipeTitle() {
    const titleInput = document.getElementById('recipeTitle');
    const titleError = document.getElementById('recipeTitleError');

    if (titleInput.value.trim() === '') {
        titleError.textContent = 'Please enter a recipe title.';
        titleError.style.display = 'block'; // Change display property
        return false;  // Indicates invalid input
    } else {
        titleError.textContent = '';  // Clears any previous error message
        titleError.style.display = 'none'; // Hide when no error
        return true;   // Indicates valid input
    }
}

// Validate the Descriptions.
function validateDescription() {
    const description = document.getElementById('description');
    const descriptionError = document.getElementById('descriptionError');
    if (description.value.trim() === '') {
        description.classList.add('is-invalid');
        descriptionError.textContent = 'Please enter a description.';
        descriptionError.style.display = 'block';
        return false;
    } else {
        description.classList.remove('is-invalid');
        descriptionError.style.display = 'none';
        return true;
    }
}

// Validate the Ingredients
function validateIngredient(input) {
    const ingredientsError = document.getElementById('ingredientsError');
    if (input.value.trim() === '') {
        ingredientsError.textContent = 'Please make sure their is no missing or blank ingredients.';
        ingredientsError.style.display = 'block';
        return false;
    } else {
        ingredientsError.style.display = 'none';
        return true;
    }
}

// Validate the Steps.
function validateStep(textarea) {
    const stepsError = document.getElementById('stepsError');
    if (textarea.value.trim() === '') {
        stepsError.textContent = 'Please make sure their is no missing or blank steps.';
        stepsError.style.display = 'block';
        return false;
    } else {
        stepsError.style.display = 'none';
        return true;
    }
}


// Initializes validation listeners for dynamic fields.
function initializeInputValidationListeners() {

    // Setup listeners for recipe title and description
    const recipeTitle = document.getElementById('recipeTitle');
    if (recipeTitle) {
        recipeTitle.addEventListener('input', validateRecipeTitle);
    }

    const description = document.getElementById('description');
    if (description) {
        description.addEventListener('input', validateDescription);
    }


    ['ingredients-group', 'steps-group'].forEach(groupId => {
        const groupElement = document.getElementById(groupId);
        const inputType = groupId === 'ingredients-group' ? 'input' : 'textarea';
        const validateFunction = groupId === 'ingredients-group' ? validateIngredient : validateStep;

        groupElement.addEventListener('click', event => {
            if (event.target.tagName === 'svg' || event.target.tagName === 'use' || event.target.closest('svg')) {
                removeInput(event.target);
            }
        });

        document.querySelectorAll(`#${groupId} .input-wrapper ${inputType}`).forEach(element => {
            element.addEventListener('input', () => validateFunction(element));
        });
    });
}



