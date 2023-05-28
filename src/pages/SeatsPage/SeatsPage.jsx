import styled from "styled-components";
import { useParams  } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SeatsPage() {
    const {idSessao} = useParams();
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
    const [movie, setMovie] = useState({});
    const [day, setDay] = useState({});
    const [hora, setHora] = useState('');
    const [seats, setSeats] = useState([]);
    const [seatsSelected, setSeatSelected] = useState([]);
    useEffect(()=>{

        const promise = axios.get(URL);
        
        promise.then((resp)=> {
            console.log(resp.data);
            setMovie(resp.data.movie);
            setDay(resp.data.day);
            setHora(resp.data.name);
            setSeats(resp.data.seats);
            console.log(resp.data.seats);

        });
        promise.catch((erro)=> {
            console.log(erro);
        });
    },[]);
    function toggleSeat(id){
        if(seatsSelected.includes(id)){
            const index = seatsSelected.indexOf(id);
            const novoArray = [...seatsSelected];
            const x = novoArray.splice(index,1);
            setSeatSelected(novoArray);
            return
        }
        setSeatSelected([...seatsSelected,id]); 
    }
    
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map(seat => (
                    <SeatItem key={seat.id} 
                    status={!seat.isAvailable? 'Ind' : seatsSelected.includes(seat.id) ? 'Sel' : 'Dis'}
                    onClick={seat.isAvailable ? ()=>toggleSeat(seat.id) : ()=> {alert("Esse assento não está disponível")} }>{seat.name}</SeatItem>
                )
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle status={'Sel'}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status={'Dis'}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status={'Ind'}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster" />
                </div>
                <div>
                    <p>Tudo em todo lugar ao mesmo tempo</p>
                    <p>Sexta - 14h00</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${(props) => props.status === 'Sel' ? '#0E7D71' : props.status === 'Ind' ? "#F7C52B" : "#7B8B99"};         // Essa cor deve mudar
    background-color: ${(props) => props.status === 'Sel' ? '#1AAE9E' : props.status === 'Ind' ? "#FBE192" : "#C3CFD9"};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${(props) => props.status === 'Sel' ? '#0E7D71' : props.status === 'Ind' ? "#F7C52B" : "#7B8B99"};         // Essa cor deve mudar
    background-color: ${(props) => props.status === 'Sel' ? '#1AAE9E' : props.status === 'Ind' ? "#FBE192" : "#C3CFD9"};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`