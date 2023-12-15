import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RelatarIncidentes = ({ route }) => {
  const { latitude, longitude } = route.params || {};
  const [incidente, setIncidente] = useState({
    Nome: '',
    Cargo: '',
    Gravidade: '',
    Horario: '',
    Local: '',
    Descricao: ''
  });
  const [incidentes, setIncidentes] = useState([]); // Armazena os incidentes adicionados
  const [mostrarBotaoAdicionar, setMostrarBotaoAdicionar] = useState(true);

  const adicionarAoCRUD = () => {
    if (incidente.Nome.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira pelo menos o nome do incidente.');
      return;
    }

    const novoIncidente = {
      ...incidente,
      Latitude: latitude,
      Longitude: longitude,
      ID: Math.floor(Math.random() * 1000) // Gerando um ID aleatório (simulação)
    };

    setIncidentes([novoIncidente]);
    limparCampos();
    setMostrarBotaoAdicionar(false);
  };

  const limparCampos = () => {
    setIncidente({
      Nome: '',
      Cargo: '',
      Gravidade: '',
      Horario: '',
      Local: '',
      Descricao: ''
    });
  };

  const handleExcluirIncidente = (id) => {
    setIncidentes([]);
    setMostrarBotaoAdicionar(true);
  };

  const handleEditarIncidente = () => {
    setMostrarBotaoAdicionar(true);
  };

  const handleEnviarLocalizacao = () => {
    const localAtual = `Latitude: ${latitude}, Longitude: ${longitude}`;
    setIncidente({ ...incidente, Local: localAtual });
  };

  function searchReport() {
    // Limpa os elementos HTML antes de preenchê-los com novos dados
    $('#title').empty();
    $('#description').empty();
    $('#imdb').empty();
    $("#my_image").attr("src", "");
  
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://127.0.0.1:3000/report", // Altere para a rota correta de busca de relatórios
      "method": "GET"
    }
  
    $.ajax(settings).done(function (response) {
      if (response.status === 'success') {
        // Suponha que a resposta seja um array de relatórios e queremos exibir o primeiro
        var firstReport = response.reports[0]; // Pode variar dependendo da estrutura da resposta
  
        // Preenche os elementos HTML com os dados do relatório
        $('#title').append(firstReport.nome); // Ajuste para o nome correto do campo
        $('#description').append(firstReport.descricao); // Ajuste para o campo de descrição
        $('#imdb').append("Gravidade: " + firstReport.gravidade); // Exemplo de exibição de gravidade
        $("#my_image").attr("src", firstReport.imagemUrl); // Ajuste para o campo que contém a URL da imagem (se aplicável)
      } else {
        console.log("Erro ao buscar relatório:", response.mssg);
      }
    });

  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={incidente.Nome}
        onChangeText={(text) => setIncidente({ ...incidente, Nome: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Cargo"
        value={incidente.Cargo}
        onChangeText={(text) => setIncidente({ ...incidente, Cargo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Gravidade"
        value={incidente.Gravidade}
        onChangeText={(text) => setIncidente({ ...incidente, Gravidade: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário do Incidente"
        value={incidente.Horario}
        onChangeText={(text) => setIncidente({ ...incidente, Horario: text })}
      />
      <View style={styles.divLocal}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Local do incidente"
          value={incidente.Local}
          onChangeText={(text) => setIncidente({ ...incidente, Local: text })}
        />
      
        <FontAwesome name="map-marker" size={35} color="red" style={styles.locationIcon} onPress={handleEnviarLocalizacao} /> 
       
      </View>
      <TextInput
        style={styles.input}
        placeholder="Descrição do incidente"
        value={incidente.Descricao}
        onChangeText={(text) => setIncidente({ ...incidente, Descricao: text })}
        multiline
        numberOfLines={4}
      />
      {mostrarBotaoAdicionar && (
        <View style={styles.buttonContainer}>
          <Button title="Adicionar ao CRUD" onPress={adicionarAoCRUD} />
        </View>
      )}
      {incidentes.map((item, index) => (
        <View key={item.ID} style={styles.incidentContainer}>
          <Text>{`Nome: ${item.Nome}`}</Text>
          <Text>{`Cargo: ${item.Cargo}`}</Text>
          <Text>{`Gravidade: ${item.Gravidade}`}</Text>
          <Text>{`Horário: ${item.Horario}`}</Text>
          <Text>{`Local: ${item.Local}`}</Text>
          <Text>{`Descrição: ${item.Descricao}`}</Text>
          <View style={styles.buttonRow}>
            <Button title="Editar" onPress={handleEditarIncidente} />
            <Button title="Excluir" onPress={() => handleExcluirIncidente(item.ID)} />
          </View>
          
        </View>
      ))}

        {!mostrarBotaoAdicionar && (
        <View style={styles.enviarRelatorioButton}>
          <Button title="Enviar Relatório de Incidente" onclick="searchReport"  />
        </View>

      
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  incidentContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap:10,
  },
  locationButton: {
    width: 150,
    marginBottom: 10,
  },
  divLocal: {
    flexDirection: 'row',
  },
  buttonContainer: {
    alignItems: 'center',
    marginLeft: 10,
  },
  locationIcon:{
    marginLeft: 10,
  },
  enviarRelatorioButton:{
    marginTop:10,
  },
});

export default RelatarIncidentes;
