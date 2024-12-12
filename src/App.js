import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleStartTimeChange = (event) => {
    const startTimeValue = event.target.value;

    // Atualiza a data de início
    setStartTime(startTimeValue);

    // Calcula a data de finalização (+1 hora)
    if (startTimeValue) {
      const startTimeDate = new Date(startTimeValue);
      const endTimeDate = new Date(startTimeDate.getTime()-60*60*2000); // Adiciona 1 hora
      setEndTime(endTimeDate.toISOString().slice(0, 16)); // Formata no padrão "YYYY-MM-DDTHH:mm"
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const eventData = {
      start_time: startTime,
      end_time: endTime,
      summary: summary,
      description: description,
    };

    try {
      const response = await axios.post('http://localhost:5000/create_event', eventData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage(response.data.message || 'Event created successfully!');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'An error occurred.');
      } else {
        setMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Agende seu atendimento</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Inicio do corte:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={handleStartTimeChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Previsão de término:</label>
          <input
            type="datetime-local"
            value={endTime}
            style={styles.input}
            disabled
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Telefone para contato:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Seu nome:</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.button}>
          Agendar
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f7f7',
    padding: '20px',
  },
  header: {
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    minHeight: '80px',
    resize: 'vertical',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  message: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#333',
  },
};

export default App;
