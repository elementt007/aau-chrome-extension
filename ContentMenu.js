function createSemesterSelect(startYear, endYear) {
  // Das Dropdown-Element erstellen
  const select = document.createElement("select");
  select.id = "semester";
  select.name = "semester";

  // onchange-Event hinzufügen
  select.addEventListener("change", function () {
    changeSemester(select.value);
  });

  // Label für das Dropdown hinzufügen
  const label = document.createElement("label");
  label.setAttribute("for", "semester");
  label.textContent = "Wähle dein Semester: ";

  const emptyOption = document.createElement("option");
  emptyOption.textContent = "Semester Wählen";
  emptyOption.value = "";
  select.appendChild(emptyOption);
  
  // Optionen hinzufügen (Sommer und Winter pro Jahr)
  for (let year = startYear; year <= endYear; year++) {
      const summerOption = createOption(`${year}S`, `${year}S`);
      const winterOption = createOption(`${year}W`, `${year}W`);
      select.appendChild(summerOption);
      select.appendChild(winterOption);
  }

  // Formular erstellen und hinzufügen
  const form = document.createElement("form");
  //form.appendChild(label);
  form.appendChild(select);

  form.style = "margin:10px;";

  // Formular in den Body einfügen
  return form;
}

function createOption(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = `${text}`;
  return option;
}

function changeURL(element, value) {
  let currentUrl = new URL(element.href);
  if(value == "") {
    currentUrl.searchParams.delete("sem"); // sem entfernen
  } else {
    currentUrl.searchParams.set("sem", value); // Neuer Wert für "sem"
  }
  
  element.href = currentUrl;
}

function changeSemester(value) {
  document.cookie = `aausemester=${value}; path=/; max-age=31536000`; // 1 year expiration
  const meineLv = document.getElementById("meineLv");
  if(meineLv != null) {
    changeURL(meineLv,value);
  }
  

  const meinePruefungen = document.getElementById("link-meine-pruefungen");
  if(meinePruefungen != null) {
    changeURL(meinePruefungen,value);
  } 
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const unikluleft = document.getElementsByClassName("unikluleft")[0];

const newNode = document.createElement("div");
const parentDiv = document.getElementsByTagName("ul")[0].parentNode;

let sp2 = document.getElementsByTagName("ul")[0];
parentDiv.insertBefore(createSemesterSelect(23,25), sp2);

const savedSemester = getCookie("aausemester");
if (savedSemester) {
  changeSemester(savedSemester);
  document.getElementById("semester").value = savedSemester;
}