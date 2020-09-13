import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import noAvatarImg from '../../assets/images/no-avatar.png';

import './styles.css';

import api from '../../services/api';

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState({} as any);
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  // Image preview
  const [previewImgSrc, setPreviewImgSrc] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  // Reference for the input file element
  const chooseFile = React.createRef<HTMLInputElement>();

  const chooseFileButton = React.createRef<HTMLButtonElement>();

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: '',
        to: '',
      },
    ]);
  }

  // [PT-BR] Entender melhor depois
  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });
    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault(); // We don't want to reload the page when submitting
    console.log(scheduleItems);
    api
      .post(
        'classes',
        {
          name,
          whatsapp,
          bio,
          subject,
          cost: Number(cost),
          schedule: scheduleItems,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('proffy-token')}`,
          },
        }
      )
      .then(() => {
        fileUploadHandler();
        alert('Cadastro realizado com sucesso!');
        history.push('/');
      })
      .catch(() => {
        alert('Erro no cadastro.');
      });
  }

  function handleSelectFile(event: any) {
    console.log(event.target.files[0]);
    if (event.target.files.length > 0) {
      setPreviewImgSrc(URL.createObjectURL(event.target.files[0]));
      setAvatar(event.target.files[0]);
    }
  }

  /*
  function renderPreviewImg() {
    if (previewImgSrc) {
      return (
        <img id='avatar-preview' src={previewImgSrc} alt='Avatar escolhido' />
      );
    }
  }
*/
  function fileUploadHandler() {
    const data = new FormData();

    data.append('file', avatar);

    api
      .post('upload', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('proffy-token')}`,
        },
      })
      .then()
      .catch(() => {
        alert('Erro no upload da imagem');
      });
  }

  return (
    <div id='page-teacher-form' className='container'>
      <PageHeader
        title='Que incrível que você quer dar aulas'
        description='O primeiro passo é preencher esse formulário de inscrição'
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            {/* renderPreviewImg() */}
            <div className='avatar-preview-container'>
              <img
                id='avatar-preview'
                src={previewImgSrc ? previewImgSrc : noAvatarImg}
                alt='Avatar escolhido'
              />
              <input
                id='input-file'
                style={{ display: 'none' }}
                ref={chooseFile}
                type='file'
                onChange={(e) => {
                  handleSelectFile(e);
                }}
              />
              <button
                id='button-choose-file'
                ref={chooseFileButton}
                onClick={(e) => {
                  e.preventDefault();
                  // If it's possibly null, we would get typescript error
                  if (chooseFile.current !== null) {
                    chooseFile.current.click();
                  }

                  if (chooseFileButton.current !== null) {
                    chooseFileButton.current.blur();
                  }
                }}
              >
                Escolha uma foto de perfil
              </button>
            </div>

            <Input
              name='name'
              label='Nome completo'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            {/* <Input
              name='avatar'
              label='Avatar'
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            /> */}

            <Input
              name='whatsapp'
              label='WhatsApp'
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />

            <Textarea
              name='bio'
              label='Biografia'
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name='subject'
              label='Matéria'
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Cálculo', label: 'Cálculo' },
                { value: 'Física', label: 'Física' },
                { value: 'Química', label: 'Química' },
                { value: 'Programação', label: 'Programação' },
              ]}
            />
            <Input
              name='cost'
              label='Custo da sua hora por aula'
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type='button' onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className='schedule-item'>
                  <Select
                    name='week_day'
                    label='Dia da semana'
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'week_day', e.target.value)
                    }
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda' },
                      { value: '2', label: 'Terça' },
                      { value: '3', label: 'Quarta' },
                      { value: '4', label: 'Quinta' },
                      { value: '5', label: 'Sexta' },
                      { value: '6', label: 'Sábado' },
                    ]}
                  />
                  <Input
                    name='from'
                    label='Das'
                    type='time'
                    value={scheduleItem.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'from', e.target.value)
                    }
                  />
                  <Input
                    name='to'
                    label='Até'
                    type='time'
                    value={scheduleItem.to}
                    style={
                      index === scheduleItems.length - 1
                        ? {}
                        : { marginBottom: '4rem' }
                    }
                    onChange={(e) =>
                      setScheduleItemValue(index, 'to', e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt='Aviso importante' />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type='submit'>Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
