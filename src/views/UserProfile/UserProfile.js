import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from "@material-ui/core/InputLabel";

// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import UserService from 'services/userService';
import HttpService from 'services/httpService';
// import avatar from "assets/img/faces/gerson.jpg";
import { NotificationManager } from 'react-notifications';
import { cpfMask, nameMask, phoneMask, cepMask } from 'utils/mask';

import * as EmailValidator from 'email-validator';
import { numberMask } from "utils/mask";

const states = [
  {
    value: 'AC',
    label: 'Acre',
  },
  {
    value: 'AL',
    label: 'Alagoas',
  },
  {
    value: 'AP',
    label: 'Amapá',
  },
  {
    value: 'AM',
    label: 'Amazonas',
  },
  {
    value: 'BA',
    label: 'Bahia',
  },
  {
    value: 'CE',
    label: 'Ceará',
  },
  {
    value: 'DF',
    label: 'Distrito Federal',
  },
  {
    value: 'ES',
    label: 'Espirito Santo',
  },
  {
    value: 'GO',
    label: 'Goiás',
  },
  {
    value: 'MA',
    label: 'Maranhão',
  },
  {
    value: 'MT',
    label: 'Mato Grosso',
  },
  {
    value: 'MS',
    label: 'Mato Grosso do Sul',
  },
  {
    value: 'MG',
    label: 'Minas Gerais',
  },
  {
    value: 'PA',
    label: 'Pará',
  },
  {
    value: 'PB',
    label: 'Paraíba',
  },
  {
    value: 'PR',
    label: 'Paraná',
  },
  {
    value: 'PE',
    label: 'Pernambuco',
  },
  {
    value: 'PI',
    label: 'Piauí',
  },
  {
    value: 'RJ',
    label: 'Rio de Janeiro',
  },
  {
    value: 'RN',
    label: 'Rio Grande do Norte',
  },
  {
    value: 'RS',
    label: 'Rio Grande do Sul',
  },
  {
    value: 'RO',
    label: 'Rondônia',
  },
  {
    value: 'RR',
    label: 'Roraima',
  },
  {
    value: 'SC',
    label: 'Santa Catarina',
  },
  {
    value: 'SP',
    label: 'São Paulo',
  },
  {
    value: 'SE',
    label: 'Sergipe',
  },
  {
    value: 'TO',
    label: 'Tocantins',
  },
];

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const [selectedDate, setSelectedDate] = React.useState(new Date('1997-08-12T00:00:00'));
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [cep, setCep] = React.useState("");
  const [city, setCity] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [complement, setComplement] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [number, setNumber] = React.useState();
  const [uf, setUf] = React.useState("CE");
  const [birth, setBirth] = React.useState(`${selectedDate.getFullYear()}-${String(selectedDate.getMonth()).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`);
  const [takePicture, setTakePicture] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setBirth(`${selectedDate.getFullYear()}-${String(selectedDate.getMonth()).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`);
  };

  async function handleCep(event) {

    setCep(cepMask(event.target.value))

    if (event.target.value.length === 9) {
      try {
        await HttpService.findCep(event.target.value)
          .then((response) => {
            if (response.status === 200) {
              if (response.data.hasOwnProperty("uf")) {
                setUf(response.data.uf);
                setCity(response.data.localidade);
                setDistrict(response.data.bairro);
                setComplement(response.data.complemento);
                setPlace(response.data.logradouro);
              }
              else {
                setUf("");
                setCity("");
                setDistrict("");
                setComplement("");
                setPlace("");
              }
            }
          });
      } catch (e) {
        console.log(e.message);
        NotificationManager.warning(e.message);
      }
    }
  }

  function handleTakePhoto(dataUri) {
    setImageSrc(dataUri);
    setTakePicture(false);
  }

  function handleTakePicture() {
    setTakePicture(true);
  }


  async function handleSubmit() {
    const user = UserService.getLoggedUser();
    if (cpf.length === 14 && name !== "" && phone !== "" && birth !== "" && cep.length === 9 && uf !== "" && city !== "" && district !== null && place !== "" && number !== "") {
      if (email !== "" && !EmailValidator.validate(email)) {
        NotificationManager.error(`Email inválido!`);
        return;
      }
      if (phone.length < 15) {
        NotificationManager.error(`Telefone inválido!`);
        return;
      }
      if (birth.length < 10) {
        NotificationManager.error(`Data de nascimento inválida!`);
        return;
      }
      const member = { "email": email, "cpf": cpf, "nome": name, "telefone": phone, "nascimento": birth, "password": cpf, "endereco": { "bairro": district, "cep": cep, "complemento": complement, "localidade": city, "logradouro": place, "uf": uf, "numero": number } };
      try {
        await HttpService.saveMember(user, member)
          .then((response) => {
            UserService.saveLoggedUser(user);
            NotificationManager.success(`Membro ${member.nome} cadastrado!`);
            setEmail("");
            setName("");
            setPhone("");
          });
      } catch (e) {
        console.log(e.message);
      }
    }
    else {
      NotificationManager.error(`Campos inválidos!`);
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Cadastrar Membro</h4>
              <p className={classes.cardCategoryWhite}>Preencha as informações do membro</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Nome"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      onChange: (event => setName(nameMask(event.target.value))),
                      value: name
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="CPF"
                    id="emimport {
                      MuiPickersUtilsProvider,
                      KeyboardTimePicker,
                      KeyboardDatePicker,
                    } from '@material-ui/pickers';ail-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      onChange: (event => setCpf(cpfMask(event.target.value))),
                      value: cpf
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email"
                    id="emimport {
                      MuiPickersUtilsProvider,
                      KeyboardTimePicker,
                      KeyboardDatePicker,
                    } from '@material-ui/pickers';ail-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      onChange: (event => setEmail(event.target.value)),
                      value: email
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Telefone"
                    id="telefone"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      onChange: (event => setPhone(phoneMask(event.target.value))),
                      value: phone
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    id="birthday"
                    type="date"
                    labelDate="Data de nascimento"
                    selectedDate={selectedDate}
                    handleDateChange={handleDateChange}
                    format="dd/MM/yyyy"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText="CEP"
                    id="emimport {
                      MuiPickersUtilsProvider,
                      KeyboardTimePicker,
                      KeyboardDatePicker,
                    } from '@material-ui/pickers';ail-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      onChange: (event => handleCep(event)),
                      value: cep
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <TextField
                    style={{
                      paddingBottom: "10px",
                      margin: "27px 0 0 0",
                      position: "relative",
                      verticalAlign: "unset"
                    }}
                    id="standard-select-currency"
                    select
                    label="Estado"
                    className="textField"
                    value={uf}
                    onChange={event => setUf(event.target.value)}
                    SelectProps={{
                      MenuProps: {
                        className: "menu",
                      },
                    }}
                    margin="normal"
                  >
                    {states.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Cidade"
                    id="telefone"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      onChange: (event => setCity(nameMask(event.target.value))),
                      value: city
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Bairro"
                    id="telefone"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      onChange: (event => setDistrict(nameMask(event.target.value))),
                      value: district
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Complemento"
                    id="emimport {
                      MuiPickersUtilsProvider,
                      KeyboardTimePicker,
                      KeyboardDatePicker,
                    } from '@material-ui/pickers';ail-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      onChange: (event => setComplement(nameMask(event.target.value))),
                      value: complement
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Logradouro"
                    id="telefone"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      onChange: (event => setPlace(event.target.value)),
                      value: place
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Número"
                    id="telefone"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      id: "standard-select-currency",
                      onChange: (event => setNumber(numberMask(event.target.value))),
                      value: number
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button onClick={handleSubmit} color="primary">Cadastrar</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
