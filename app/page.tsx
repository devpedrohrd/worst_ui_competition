"use client";

import { useState } from "react";

// Lista de piadas em português sobre programação
const programmingJokesPtBR = [
  "Qual é o cúmulo da paciência? Esperar o computador reiniciar!",
  "Por que o programador foi ao oftalmologista? Porque ele não conseguia ver o código direito.",
  "O que um loop infinito disse ao outro? ‘Deixa de ser repetitivo!’",
  "Por que o Java não usa óculos? Porque ele já tem classes.",
  "O que o código disse para o programador? ‘Sem você, eu não faço sentido.’",
  "Como o programador pede café? Um Java, por favor!",
  "Por que o programador não consegue sair de casa? Porque ele não consegue encontrar a chave.",
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    favoriteOlympicSport: "",
  });
  const [message, setMessage] = useState("");
  const [isCancelClicked, setIsCancelClicked] = useState(false); // Controle para exibir o modal do gato
  const [showMotivation, setShowMotivation] = useState(false); // Mostra a frase de motivação
  const [catImage, setCatImage] = useState<string | null>(null); // Armazena o URL da imagem do gato
  const [programmingJoke, setProgrammingJoke] = useState<string | null>(null); // Armazena a piada em PT-BR

  // Função para pegar uma imagem de gato triste da API
  const fetchCatImage = async () => {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?mime_types=jpg,png"
      );
      const data = await response.json();
      setCatImage(data[0].url); // URL da imagem de gato
    } catch (error) {
      console.error("Erro ao buscar a imagem de gato:", error);
    }
  };

  // Função para buscar uma piada aleatória da lista de piadas em português
  const fetchProgrammingJokePtBR = () => {
    const randomJoke =
      programmingJokesPtBR[
        Math.floor(Math.random() * programmingJokesPtBR.length)
      ];
    setProgrammingJoke(randomJoke); // Define a piada aleatória em português
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Para o campo de nome, permite apagar, mas ainda adiciona letras aleatórias ao digitar
    if (name === "name" && value.length >= formData.name.length) {
      const randomChar = String.fromCharCode(
        97 + Math.floor(Math.random() * 26)
      ); // Letra aleatória
      setFormData((prevData) => ({
        ...prevData,
        [name]: value + randomChar, // Adiciona uma letra aleatória a cada digitação
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Permite apagar as letras
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      setMessage("Erro! Bem-vindo ao caos... ou não.");
    }, 2000);
  };

  const handleCancelClick = async () => {
    setIsCancelClicked(true); // Mostra o gato triste
    await fetchCatImage(); // Busca a imagem de gato triste
  };

  const handleYesClick = () => {
    setShowMotivation(true); // Mostra frase de motivação
    fetchProgrammingJokePtBR(); // Busca a piada em português
  };

  const handleNoClick = () => {
    setIsCancelClicked(false); // Retorna ao formulário
    setShowMotivation(false); // Certifique-se de ocultar a mensagem de motivação
    setProgrammingJoke(null); // Limpa a piada ao voltar ao formulário
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500 relative">
      {/* Formulário */}
      {!isCancelClicked && !showMotivation && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-lg shadow-md relative w-96 text-center"
        >
          <h1 className="text-3xl font-bold mb-4 text-pink-600">
            Pior Formulário Olímpico!
          </h1>

          {/* Campo de Nome (adiciona letras aleatórias, mas pode apagar) */}
          <div className="mb-4 text-right">
            <label className="block text-sm font-bold mb-2 text-black">
              Nome:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 text-right border-2 border-red-500 text-black"
              placeholder="Tente digitar seu nome"
            />
          </div>

          {/* Campo de E-mail */}
          <div className="mb-4 text-center">
            <label className="block text-sm font-bold mb-2 text-black">
              Digite seu Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-yellow-500"
              placeholder="Seu email"
            />
          </div>

          {/* Campo de Idade */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-black">
              Idade:
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-green-500"
              placeholder="Sua idade"
            />
          </div>

          {/* Campo de Esporte Favorito */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-black">
              Esporte Olímpico Favorito:
            </label>
            <select
              name="favoriteOlympicSport"
              value={formData.favoriteOlympicSport}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-blue-500"
            >
              <option value="">Selecione...</option>
              <option value="corrida">Corrida</option>
              <option value="natação">Natação</option>
            </select>
          </div>

          {/* Botões */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancelClick}
              className="bg-purple-600 text-white px-4 py-2 rounded-full transform transition-transform duration-500 hover:scale-125"
            >
              Cancelar (Surpresa!)
            </button>
            <button
              type="submit"
              className="bg-pink-600 text-white px-4 py-2 rounded-full transform hover:rotate-12"
            >
              Enviar (Se quiser)
            </button>
          </div>

          {/* Mensagem de erro com delay */}
          {message && <p className="mt-4 text-red-600 font-bold">{message}</p>}
        </form>
      )}

      {/* Modal do Gato ao Cancelar */}
      {isCancelClicked && !showMotivation && catImage && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90">
          {/* Gato triste da API */}
          <img
            src={catImage}
            alt="Gato triste"
            className="w-64 h-64 rounded-lg shadow-lg mb-4"
          />
          <p className="text-2xl mb-4 text-black">
            Você realmente vai desistir?
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleYesClick}
              className="bg-red-600 text-white px-4 py-2 rounded-full"
            >
              Sim
            </button>
            <button
              onClick={handleNoClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-full"
            >
              Não
            </button>
          </div>
        </div>
      )}

      {/* Exibe uma frase motivacional e uma piada de programação após o "Sim" */}
      {showMotivation && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90">
          <p className="text-3xl font-bold mb-4 text-center text-black">
            "Nunca desista, você é capaz de superar qualquer desafio!"
          </p>
          {programmingJoke && (
            <p className="text-xl text-center text-black mb-4">
              {programmingJoke}
            </p>
          )}
          <button
            onClick={handleNoClick}
            className="bg-green-600 text-white px-6 py-2 rounded-full"
          >
            Voltar ao formulário
          </button>
        </div>
      )}
    </div>
  );
}
