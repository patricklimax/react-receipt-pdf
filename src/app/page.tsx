'use client'
import { useState } from 'react';
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { insertMaskCPF } from '@/functions/cpf';

const options: Options = {
  method: "open",
  resolution: Resolution.HIGH,
  page: {
    margin: Margin.MEDIUM,
    format: "letter",
    orientation: "portrait",
  },
};

const numero = require('numero-por-extenso');

export default function Home() {

  const [pagador, setPagador] = useState('')
  const [cpfPagador, setCpfPagador] = useState('')
  const [telPagador, setTelPagador] = useState('')
  const [beneficiario, setBeneficiario] = useState('')
  const [cpfBeneficiario, setCpfBeneficiario] = useState('')
  const [telBeneficiario, setTelBeneficiario] = useState('')
  const [receiptValue, setReceiptValue] = useState('')
  const [description, setDescription] = useState('')
  const [observation, setObservation] = useState('')
  const [city, setCity] = useState('')
  const [stateUF, setStateUF] = useState('')
  const [dataDay, setDataDay] = useState('')

  const openPDF = () => {
    generatePDF(() => document.getElementById("wrapper"), options);
  };

  const datedReceipt = new Date(Date.parse(dataDay)).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const newReceipt = () => {
    setPagador('')
    setCpfPagador('')
    setTelPagador('')
    setBeneficiario('')
    setCpfBeneficiario('')
    setReceiptValue('')
    setTelBeneficiario('')
    setDescription('')
    setObservation('')
    setCity('')
    setStateUF('')
    setDataDay('')
  }



  return (
    <main className="flex flex-col items-center">
      <h1 className='w-full text-center font-bold text-2xl py-4'>
        EMISSOR DE RECIBO
      </h1>
     
      <Tabs defaultValue="receiptData" className="w-full md:w-3/5">
        <TabsContent value="receiptData" >
          <Card className='flex flex-col gap-5 p-4'>
            <div id='infos' className='flex flex-col md:flex-row gap-4'>
              <Card id='pagador' className='p-4 md:w-1/2'>
                <h1 className='font-semibold ml-1 mb-1'>Dados do Pagador</h1>
                <div className='flex flex-col gap-2'>
                  <Input
                    type="text"
                    value={pagador}
                    onChange={e => setPagador(e.target.value)}
                    
                    placeholder='Nome do Pagador' />

                  <div className='flex gap-2'>
                    <Input
                      type="number"
                      value={cpfPagador}
                      onChange={e => setCpfPagador(e.target.value)}
                      
                      placeholder='CPF' />
                    <Input
                      type="tel"
                      value={telPagador}
                      onChange={e => setTelPagador(e.target.value)}
                      
                      placeholder='Telefone' />
                  </div>
                </div>
              </Card>

              <Card id='beneficiario' className='p-4 md:w-1/2'>
                <h1 className='font-semibold ml-1 mb-1'>
                  Dados do Beneficiário
                </h1>
                <div className='flex flex-col gap-2'>

                  <Input
                    type="text"
                    value={beneficiario}
                    onChange={e => setBeneficiario(e.target.value)}
                   
                    placeholder='Nome do Beneficiário' />

                  <div className='flex gap-2'>
                    <Input
                      type="number"
                      value={cpfBeneficiario}
                      onChange={e => setCpfBeneficiario(e.target.value)}
                      
                      placeholder='CPF' />
                    <Input
                      type="tel"
                      value={telBeneficiario}
                      onChange={e => setTelBeneficiario(e.target.value)}
                      
                      placeholder='Telefone' />
                  </div>
                </div>
              </Card>
            </div>

            <div id='details' className='flex flex-col md:flex-row gap-4'>
              <Card id='description' className='flex-1 p-4'>
                <h1 className='font-semibold ml-1 mb-1'>Descrição do Serviço/Produto</h1>
                <Textarea
                  
                  placeholder='Descreva aqui'
                  value={description}
                  onChange={e => setDescription(e.target.value)} />
              </Card>

              <Card id='observation' className='flex-1 p-4'>
                <h1 className='font-semibold ml-1 mb-1'>Observação:</h1>
                <Textarea
                 
                  placeholder='Descreva aqui'
                  value={observation}
                  onChange={e => setObservation(e.target.value)} />
              </Card>
            </div>

            <div id='valueLocation' className='flex flex-col md:flex-row gap-4'>
              <Card id='values' className='p-4 md:w-3/12 flex md:flex-col gap-4 md:gap-0 items-center md:items-start'>
                <h1 className='font-semibold ml-1 md:mb-1'>Valor</h1>
                <Input
                  type="number"
                  value={receiptValue}
                  onChange={e => setReceiptValue(e.target.value)}
                 
                  placeholder='R$' />
              </Card>

              <Card className='p-4'>
                <h1 className='font-semibold ml-1 mb-1'>Local e Data</h1>
                <div className='flex gap-2'>
                  <Input
                    type="text"
                    value={stateUF}
                    onChange={e => setStateUF(e.target.value)}
                    
                    placeholder='Estado' />
                  <Input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    
                    placeholder='Município' />
                  <Input
                    type="date"
                    value={dataDay}
                    onChange={e => setDataDay(e.target.value)}
                   
                    placeholder='Data' />
                </div>
              </Card>
              <div className='flex justify-center items-center'>
                <Button onClick={newReceipt}>
                  Novo
                </Button>
              </div>

            </div>
          </Card>

        </TabsContent>


        <TabsContent value="receiptView">
          <Card className='flex flex-col gap-5 p-4'>
            <div className='p-20' id="wrapper">

              <h1 className='text-4xl text-center font-semibold'>
                Recibo de Pagamento
              </h1>

              <p className='text-right font-semibold text-3xl my-16'>
                {receiptValue ? parseFloat(receiptValue).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : <span className='text-red-600'>0,00</span>}
              </p>

              <p className='text-justify mb-20'>
                Eu, {beneficiario ? <span className='font-semibold'>{beneficiario}</span> : <span className='text-red-600'>Nome Beneficiário</span>}, CPF nº {cpfBeneficiario ? <span className='font-semibold'>{cpfBeneficiario}</span> : <span className='text-red-600'>XXX.XXX.XXX-XX</span>}, Telefone: {telBeneficiario ? <span className='font-semibold'>{telBeneficiario}</span> : <span className='text-red-600'>(DDD) 9XXXX-XXXX</span>}, DECLARO que recebi do Sr.(a) {pagador ? <span className='font-semibold'>{pagador}</span> : <span className='text-red-600'>Nome do Pagador</span>}, CPF nº {cpfPagador ? <span className='font-semibold'>{cpfPagador}</span> : <span className='text-red-600'>XXX.XXX.XXX-XX</span>}, Telefone: {telPagador ? <span className='font-semibold'>{telPagador}</span> : <span className='text-red-600'>(DDD) 9XXXX-XXXX</span>}, a quantia de {receiptValue ? parseFloat(receiptValue).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : <span className='text-red-600'>0,00</span>} ({receiptValue ? numero.porExtenso(receiptValue, numero.estilo.monetario) : <span className='text-red-600'>zero reais</span>}), referente ao pagamento {description ?  description  : <span className='text-red-600'>inserir descrição</span>}.
              </p>

              {
                observation && <div className='text-justify mb-20'>
                  <p className='font-semibold'>Observação:</p>
                  {observation}
                </div>
              }

              <p className='mb-16 text-center'>
                {city ? city : <span className='text-red-600'>Cidade</span>}, {stateUF ? stateUF : <span className='text-red-600'>Estado</span>}, {dataDay ? datedReceipt : <span className='text-red-600'>Data</span>}.
              </p>
              <div className='text-center'>
                <p>{beneficiario}</p>
                <p>CPF: {cpfBeneficiario}</p>
              </div>
            </div>

            <div className='flex justify-center items-center'>
              <Button onClick={openPDF}>Gerar Recibo</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsList className='w-full mt-5'>
          <TabsTrigger className='w-1/2' value="receiptData">
            PREENCHER RECIBO
          </TabsTrigger>
          <TabsTrigger className='w-1/2' value="receiptView">
            VISUALIZAR
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <footer className='p-8 flex flex-col items-center justify-center text-xs'>
        <p>Desenvolvido por Patrick Lima</p>
        <p>(98) 98334-2518</p>
        <p>Instagram: @patricklimax</p>
      </footer>
    </main>
  );
}
