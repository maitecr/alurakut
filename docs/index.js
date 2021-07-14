import React from 'react';
import MainGrid from '../src/componentes/MainGrid'
import Box from '../src/componentes/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/componentes/ProfileRelations'

function ProfileSidebar (propriedades){  
  return(
    <Box as="aside">
    <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}} />
    <hr />

    <p>
      <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
      </a>
    </p>
    <hr />
    <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const usuario = 'maitecr';
  const [comunidades, setComunidades] = React.useState([{
    id: '01',
    title: 'no limietzsche',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYEeFUBW5W7UmPjcIITuzlSM8VBgw6eK8a7A&usqp=CAU'
  }]);
  //const comunidades = comunidades[0];
  //const alteradorDeComunidades/setComunidades = comunidades [1];
  console.log('nosso teste', comunidades);
  // const comunidades = ['Alurakut'];
  const pessoasFavoritas = ['viniirale', 'DanielRAcosta', 'amfabian', 'Krigeren', 'fabio-baum', 'simaraconceicao']

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={usuario} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}> 
          <Box>
            <h1 className="title">
              Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'))
              console.log('Campo: ', dadosDoForm.get('image'))

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
              console.log(comunidades);
            }}>

              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                />
              </div>
              <div>
                <input 
                placeholder="Coloque uma URL para usarmos de capa:" 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa:" />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea"style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades  ({comunidades.length})
            </h2>
            {
               <ul>
               {comunidades.map((itemAtual) => {
                 return (
                   <li key={itemAtual.id}>
                     <a href={`/users/${itemAtual.title}`}>
                        <img src={itemAtual.image} />
                         <span>{itemAtual.title}</span>
                       </a>
                   </li>
                 )
                })}
              </ul>
            }         
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Pessoas da Comunidade  ({pessoasFavoritas.length})
            </h2>

          <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                </li>
              )
            })}
          </ul>
          </ProfileRelationsBoxWrapper>

          <Box>
            Comunidades
          </Box>
        </div>
        
      </MainGrid>
    </>
      )
}
