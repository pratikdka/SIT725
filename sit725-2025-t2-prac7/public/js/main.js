const makeCard = (item) => `
  <div class="col s12 m6 l4">
    <div class="card medium">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${item.image}">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">
          ${item.title}
          <i class="material-icons right">more_vert</i>
        </span>
        <p><a href="#">${item.link || ""}</a></p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">
          ${item.title}<i class="material-icons right">close</i>
        </span>
        <p class="card-text">${item.description || ""}</p>
      </div>
    </div>
  </div>
`;

async function loadCards() {
  try {
    const res = await fetch("/api/projects");
    const json = await res.json();
    const cards = (json.data || []).map(makeCard).join("");
    $("#card-section").html(cards);
  } catch (e) {
    console.error(e);
    $("#card-section").html("<p>Failed to load projects.</p>");
  }
}

function submitForm() {
  const formData = {
    first_name: $("#first_name").val(),
    last_name: $("#last_name").val(),
    password: $("#password").val(),
    email: $("#email").val(),
  };
  console.log("Form Data Submitted:", formData);
  if (window.socketPing) window.socketPing();
  M.toast({ html: "Form submitted (check console)" });
}

$(document).ready(function () {
  $(".materialboxed").materialbox();
  $(".modal").modal();
  $("#formSubmit").click(submitForm);
  loadCards();
});
