async function listarEmprestimos() {
    const listagem = await fetch('../html/listaEmprestimos.html');
    const lista = await listagem.text();

    document.querySelector("main")!.innerHTML = lista;
}

listarEmprestimos();