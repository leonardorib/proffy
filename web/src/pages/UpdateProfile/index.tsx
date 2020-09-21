import React, { useState, FormEvent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../hooks/user';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import noAvatarImg from '../../assets/images/no-avatar.png';

import './styles.css';

import api from '../../services/api';

function UpdateProfile() {
  const history = useHistory();

  // Can be used later on to check if user is a teacher
  const { userData } = useUser();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState({} as any);
  const [changedAvatar, setChangedAvatar] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  // Image preview
  const [previewImgSrc, setPreviewImgSrc] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const getClassData = useCallback(async () => {
    const response = await api.get('profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('proffy-token')}`,
      },
    });

    const responseData = response.data[0];

    setFirstName(responseData.first_name);
    setLastName(responseData.last_name);
    setWhatsapp(responseData.whatsapp);
    setBio(responseData.bio);

    setSubject(responseData.subject);
    const scheduleReceived = responseData.schedule;
    const scheduleFormated = scheduleReceived.map((item: any) => {
      const fromFormated =
        item.from / 60 < 10 ? `0${item.from / 60}:00` : `${item.from / 60}:00`;
      const toFormated =
        item.to / 60 < 10 ? `0${item.to / 60}:00` : `${item.to / 60}:00`;
      return {
        week_day: item.week_day,
        from: fromFormated,
        to: toFormated,
      };
    });
    setScheduleItems(scheduleFormated);
    setCost(responseData.cost);
    responseData.avatar_url && setPreviewImgSrc(responseData.avatar_url);
  }, []);

  useEffect(() => {
    getClassData();
  }, [getClassData]);

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

    api
      .put(
        'profile',
        {
          first_name: firstName,
          last_name: lastName,
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
      setChangedAvatar(true);
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

    if (changedAvatar) {
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
  }

  useEffect(() => {
    if (!userData.is_teacher) {
      history.push('give-classes');
    }
  }, [userData, history]);

  return (
    <div id='page-teacher-form' className='container'>
      <PageHeader
        title='Bem vindo novamente!'
        description='Preencha o formulário abaixo caso deseje atualizar o seu perfil'
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
                Alterar foto de perfil
              </button>
            </div>

            <Input
              name='firstName'
              label='Nome'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />

            <Input
              name='lastName'
              label='Sobrenome'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
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
            <button type='submit'>Salvar alterações</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default UpdateProfile;
