const cardList = [
    {
        title: "Math",
        image: "images/math.jpg",
        link: "Study of numbers, shapes, patterns, quantity, and space",
        desciption: " It's a fundamental science that uses logic, reasoning, and often symbols and rules to understand and describe relationships in the world and in abstract concepts."
    },
    {
        title: "English",
        image: "images/English.jpg",
        link: " West Germanic language that originated in England and has become a global lingua franca",
        desciption: " It's the most widely spoken language in the world when considering both native and non-native speakers. English is an official or national language in numerous countries, including the United Kingdom, the United States, Canada, Australia, and New Zealand."
    }
]
const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();

    console.log("Form Data Submitted: ", formData);
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
    '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
    '</div><div class="card-content">'+
    '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
    '<div class="card-reveal">'+
        '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
        '<p class="card-text">'+item.desciption+'</p>'+
      '</div></div></div>';
      $("#card-section").append(itemToAppend)
    });
}



$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        submitForm();
    })
    addCards(cardList);
    $('.modal').modal();
  });