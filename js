// Chave usada no localStorage
const STORAGE_KEY = "vagas_estacionamento";

// 1. SALVAR
function salvarVeiculo(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let Numero = document.getElementById("Numero").value;
    let telefone = document.getElementById("telefone").value;
    let placa = document.getElementById("placa").value;
    let modelo = document.getElementById("modelo").value;
    let tipo = document.getElementById("tipo").value;
    let cor = document.getElementById("cor").value;
    let entrada = document.getElementById("entrada").value;

    // Imprime os valores no console
    console.log(nome + "\n" + Numero + "\n" + telefone + "\n" + placa + "\n" + modelo + "\n" + tipo + "\n" + cor + "\n" + entrada + "\n");

    const novoVeiculo = {
        id: Date.now(),
        nome: nome,
        numeroApto: Numero,
        telefone: telefone,
        placa: placa,
        modelo: modelo,
        tipo: tipo,
        cor: cor,
        entrada: entrada
    };

    const veiculos = obterVeiculos();
    veiculos.push(novoVeiculo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(veiculos));

    alert("Cadastro de vaga confirmado com sucesso!");
    document.getElementById("formulario").reset();
    listarVeiculos();
}

// 2. LISTAR
function listarVeiculos() {
    const listaContainer = document.getElementById("lista-veiculos");
    if (!listaContainer) return;

    const veiculos = obterVeiculos();
    listaContainer.innerHTML = "";

    if (veiculos.length === 0) {
        listaContainer.innerHTML = "<p>Nenhum veículo cadastrado no momento.</p>";
        return;
    }

    veiculos.forEach((veiculo) => {
        const item = document.createElement("div");
        item.className = "item-veiculo";
        item.innerHTML = `
            <div>
                <strong>${veiculo.modelo} (${veiculo.placa})</strong> - ${veiculo.cor}<br>
                <span>Proprietário: ${veiculo.nome} | Apto: ${veiculo.numeroApto}</span><br>
                <span>Entrada: ${veiculo.entrada}</span>
            </div>
            <button type="button" class="btn-remover" onclick="removerVeiculo(${veiculo.id})">Remover</button>
        `;
        listaContainer.appendChild(item);
    });
}

// 3. REMOVER
function removerVeiculo(id) {
    let veiculos = obterVeiculos();
    veiculos = veiculos.filter(veiculo => veiculo.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(veiculos));

    listarVeiculos();
}

// Função auxiliar
function obterVeiculos() {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
}

// Event Listeners
document.getElementById("formulario").addEventListener("submit", salvarVeiculo);
document.addEventListener("DOMContentLoaded", listarVeiculos);
