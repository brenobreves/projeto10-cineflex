import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SessionsPage({currentPage , setCurrentPage , previousPage , setPreviousPage}) {
    const {idFilme} = useParams();
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;
    const [sessoes, setSessoes] = useState([]);
    const [posterURL, setPosterURL] = useState('');
    const [nomeFilme, setNomeFilme] = useState('');
    useEffect(()=>{

        const promise = axios.get(URL);
        
        promise.then((resp)=> {
            setSessoes(resp.data.days);
            setPosterURL(resp.data.posterURL);
            setNomeFilme(resp.data.title);
        });
        promise.catch((erro)=> {
            console.log(erro);
        });
    },[]);
    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessoes.map( sessao => (
                    <SessionContainer data-test="movie-day" key={sessao.id}>
                    {`${sessao.weekday} - ${sessao.date}`}
                    <ButtonsContainer>
                        {sessao.showtimes.map( showtime => (
                            <Link to={`/assentos/${showtime.id}`} key={showtime.id}>
                                <button data-test="showtime" key={showtime.id}>{showtime.name}</button>
                            </Link>
                        )
                        )}
                    </ButtonsContainer>
                </SessionContainer>
                )
                )}

            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={posterURL} alt="poster" />
                </div>
                <div>
                    <p>{nomeFilme}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #DFE6ED;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 26px;
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
        margin-top:0px;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`