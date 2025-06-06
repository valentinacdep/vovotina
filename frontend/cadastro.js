const form = document.getElementById('cadastroForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const response = await fetch('http://localhost:2000/cadastro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name, email, senha })
  });

  const result = await response.json();

  if (result.success) {
    window.location.href = "index.html";
  } else {
    alert("Não foi possível realizar seu cadastro, tente novamente.");
  }
});