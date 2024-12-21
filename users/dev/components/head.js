// head.js
function loadHTMLHead() {
    const headContent = `
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" type="image/gif" />
      <title>Desarrollador</title>
  
      <!-- Google Fonts - Poppins -->
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet" />
  
      <!-- Bootstrap Icons -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
  
      <!-- Bootstrap CSS -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
  
      <!-- Style -->
      <link rel="stylesheet" href="./css/style.css" />
    `;

    const headElement = document.createElement('div');
    headElement.innerHTML = headContent;
    document.getElementById('HTMLhead-container').appendChild(headElement);
}

// Ejecutar la función para cargar el contenido del head
loadHTMLHead();
