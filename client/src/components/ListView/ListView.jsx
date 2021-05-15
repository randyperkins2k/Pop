import React, { useState, useEffect } from 'react';
import MerchList from './MerchList.jsx';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next'

const Ul = styled.ul`
background-color: ${props => props.theme.mode === 'dark' ? '#803452' : '##f5abc9'};


`

const Div = styled.div`

margin: 30px  ;
`
const Div2 = styled.div`

margin: 16px 50px;
`
const Div3 = styled.ul`
background-color: ${props => props.theme.mode === 'dark' ? '#803452' : '#f5abc9'};

`
const Div4 = styled.ul`
background-color: ${props => props.theme.mode === 'dark' ? '#803452' : '#f5abc9'};

`

const ListView = ({ merchData, selectMerchant, userSubs, setUserSubs }) => {
  const [ openPopsView, setOpenPopsView ] = useState(true);
  const [ yourSubsView, setYourSubsView ] = useState(false);
  const [ searchPopsView, setSearchPopsView ] = useState(false);
  const [ inputView, setInputView ] = useState(false)
  const [ search, setSearch ] = useState('')
  const { t, i18n } = useTranslation();
  const { name } = merchData[0];

const updateSearch = (e) => {
  setSearch(e.target.value.substr(0, 40))
} 

  return (
    <div>
      <Div></Div>

      <button 
      inputView={inputView}
      onClick={() => {
        setInputView(false)
        setOpenPopsView(true)
      }}>{t('openNowBtn')}</button>
      <button
       inputView={inputView}
       onClick={() => {
        setInputView(!inputView)
        setSearchPopsView(true)
      }}>{t('searchPopUpsBtn')}</button>
      <button
      inputView={inputView}
      onClick={() => {
        setInputView(false)
        setOpenPopsView(false)
        setSearchPopsView(false)
        }}
        >
          {t('favoritesBtn')}</button>
      { inputView ?
        <input
        type='text'
        value={search.toLowerCase()}
        onChange={updateSearch}
/>
:
null
}
<Div2></Div2>
      <Ul>
      {
        !searchPopsView ?
        <Div3>
      
          {
          openPopsView ?
            merchData.map(merch => {
              if (merch.isOpen) {
                return <MerchList
                key={merch.id}
                merchant={merch}
                selectMerchant={selectMerchant}/>
              }
            })
            :
            userSubs.sort((a,b) => {
              return (a.isOpen === b.isOpen) ? 0 : a.isOpen ? -1 : 1;
            }).map(merch => <MerchList
              key={merch.id}
              merchant={merch}
              selectMerchant={selectMerchant}
            />)
          }
          </Div3>
        :

        <Div4>
        {merchData.filter(merch => merch.name.toLowerCase().indexOf(search) !== -1
        || merch.info.toLowerCase().indexOf(search) !== -1)
        .map(merch => {
            return <MerchList
            key={merch.id}
            merchant={merch}
            selectMerchant={selectMerchant}/>
          }) 
        }

        </Div4>

      }
      </Ul>
    </div>
  );
}
export default ListView;















// const BtnWrapper = styled.div`
// text-align: center;
// `
// const Open = styled.button`
//   margin-top: 21px;
//   margin-bottom: 2rem;
//   color: black;
//   font-family: 'Ubuntu';
//   padding: 5px 16px;
//   background-color: white;
//   font-size: 11px;
//   border-radius: 6px;
//   border-width: 1px;
//   border-color: lightgray;
//   transition: ease 0.01s all;
// ${props => props.openPrimary && css`
// opacity: .5;
// color: black;
// background-color: #FFD1DC;
// font-size: 11.25px;
// `}
// `
// const Favs = styled.button`
//   margin-left: 6px;
//   color: black;
//   font-family: 'Ubuntu';
//   padding: 5px 16px;
//   background-color: white;
//   font-size: 11px;
//   border-radius: 6px;
//   border-width: 1px;
//   border-color: lightgray;
//   transition: ease 0.01s all;
//   ${props => props.favPrimary && css`
// opacity: .5;
// color: black;
// background-color: #FFD1DC;
// font-size: 11.25px;
// `}
// `
// const Search = styled.button`
//   margin-left: 6px;
//   color: black;
//   font-family: 'Ubuntu';
//   padding: 5px 16px;
//   background-color: white;
//   font-size: 11px;
//   border-radius: 6px;
//   border-width: 1px;
//   border-color: lightgray;
//   transition: ease 0.01s all;
//   ${props => props.sPUPrimary && css`
//   opacity: .5;
//   color: black;
//   background-color: #FFD1DC;
//   font-size: 11.25px;
//   `}
// `
// const Wrap = styled.div`
// margin-left: 100px;
// `