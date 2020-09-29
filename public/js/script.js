// initialize sidenav using materialize js
$(document).ready(function () {
    $(".sidenav").sidenav();
});

// initialize slider using materialize js
const slider = document.querySelector(".slider");
M.Slider.init(slider, {
    indicators: false,
    height: 500,
});



$(document).ready(function () {

    $(document).on("click", "#signIn", signIn);
    $(document).on("click", "#signUp", signUp);
    $(document).on("click", "#recipe-form", recipeSubmit);
    $(document).on("click", "#addIngredient", addIngredient);

    function signIn(event) {
        event.preventDefault();
        $(".alert").hide();
        var userIn = {
            user_name: $("#inputUser").val().trim(),
            password: $("#inputPassword1").val().trim(),
        };
        $.post('/users/login', userIn).then(function (data) {
        
        if(data == "User Does not Exist"){
            $("#usernameAlert").show();
            $("input").val('');
        }
        else if(data == "Incorrect password"){
            $("#passwordAlert").show();
            $("input").val('');
        }
        else{
            console.log(data)
            $("#successfulAlert").show();
        }

        })
    }

    function signUp(event) {
        event.preventDefault();
        $(".alert").hide();
        var newUser = {
            user_name: $('#inputUser').val().trim(),
            password: $('#inputPassword1').val().trim(),
        };

        $.post('/users/register', newUser).then(function (data) {
            if(data == "Username already exists"){
            $("#usernameExist").show();
            $("input").val('');
            }
            else if (data == "Fields Cannot Be Empty"){
            $("#fieldsEmpty").show();
            $("input").val('');

            }
            else {
            console.log(data);
            console.log("New User")
            $("#signUpAlert").show();
            $("input").val('');
            }
        })
    }

    $(document).on("click", ".searchBtn", function () {
        var btnText = $(this).attr("data-text");
        $("#searchMe").html(btnText);

        if (btnText === "Search by User Name") {
            $("#searchMe").attr("data-value", "user_name");
        } else {
            $("#searchMe").attr("data-value", "recipe_name");
        }
    })

    $(document).on("click", "#searchMe", function () {
        event.preventDefault();
        var url;
        var userInput = $("#searchwhat").val().trim();
        if ($("#searchMe").attr("data-value") === "user_name") {
            url = "user";
        } else {
            url = "recipe"
        }
        var query = "/api/" + url + "/" + userInput;
        console.log(query)
        $.ajax({
            url: query,
            type: "GET",
        }).then(
                function (data) {
                    // console.log(data);
                    window.location.href = query
                    console.log(query);

                })
    });

    function recipeSubmit(event) {
        event.preventDefault();

        var newRecipe = {
            recipe_name: $("#inputRecipeName").val().trim(),
            user_name: $("#inputUserName").val().trim(),
            ingredients: ingredientsArray.toString(),
            instructions: $("#inputInstructions").val().trim(),
            cook_time: parseInt($("#inputCook").val().trim()),
            prep_time: parseInt($("#inputPrep").val().trim()),

        }
        console.log(newRecipe)
        $.ajax("/api/recipe", {
            type: "POST",
            data: newRecipe
        }).then(
            function () {
                $('#showMeTheModal').modal('toggle');
                // console.log()
                console.log("created new recipe");
            }
        );
    };

    //ingredients to be added
    var ingredientsArray = [];

    function addIngredient(event) {
        event.preventDefault();
        //need to remove & and insert commas where split occurs
        var oneIngredient = [
            $("#inputAmount").val().trim(),
            $("#inputMeasurement").val().trim(),
            $("#inputIngredient").val().trim()
        ].join(" ").replace(/\s\s/g, " ");
        console.log(oneIngredient);
        ingredientsArray.push(oneIngredient);
        $('.showIngredients').append("<li>" + oneIngredient + "</li>");
        $("#inputAmount").val("");
        $("#inputMeasurement").val("");
        $("#inputIngredient").val("");
        console.log(ingredientsArray)
    };

})