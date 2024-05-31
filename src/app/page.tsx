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
  const [benefiario, setBenefiario] = useState('')
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
    setBenefiario('')
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
    <main className="flex flex-col items-center gap-2 p-2 py-2">
      <h1 className='w-full text-center font-bold text-2xl p-2'>
        EMISSOR DE RECIBO
      </h1>
      <Tabs defaultValue="receiptData" className="w-3/5">
        <TabsList className='flex'>
          <TabsTrigger className='flex-1' value="receiptData">
            DADOS DO NOVO RECIBO
          </TabsTrigger>
          <TabsTrigger className='flex-1' value="receiptView">
            VISUALIZAR
          </TabsTrigger>
        </TabsList>

        <TabsContent value="receiptData" >
          <Card className='flex flex-col gap-5 p-4'>
            <div id='infos' className='flex gap-5'>
              <Card id='pagador' className='p-4 w-1/2'>
                <h1 className='font-semibold ml-1 mb-1'>Dados do Pagador</h1>
                <div className='flex flex-col gap-2'>
                  <Input
                    type="text"
                    value={pagador}
                    onChange={e => setPagador(e.target.value)}
                    className='rounded p-2 text-sm w-full'
                    placeholder='Nome do Pagador' />

                  <div className='flex gap-2'>
                    <Input
                      type="number"
                      value={cpfPagador}
                      onChange={e => setCpfPagador(e.target.value)}
                      className='rounded p-2 text-sm w-1/2 text-center'
                      placeholder='CPF' />
                    <Input
                      type="tel"
                      value={telPagador}
                      onChange={e => setTelPagador(e.target.value)}
                      className='rounded p-2 text-sm w-1/2 text-center'
                      placeholder='Telefone' />
                  </div>
                </div>
              </Card>

              <Card className='p-4 w-1/2' id='beneficiario'>
                <h1 className='font-semibold ml-1 mb-1'>
                  Dados do Beneficiário
                </h1>
                <div className='flex flex-col gap-2'>

                  <Input
                    type="text"
                    value={benefiario}
                    onChange={e => setBenefiario(e.target.value)}
                    className='rounded p-2 text-sm w-full'
                    placeholder='Nome do Beneficiário' />

                  <div className='flex gap-2'>
                    <Input
                      type="number"
                      value={cpfBeneficiario}
                      onChange={e => setCpfBeneficiario(e.target.value)}
                      className='rounded p-2 text-sm w-1/2 text-center'
                      placeholder='CPF' />
                    <Input
                      type="tel"
                      value={telBeneficiario}
                      onChange={e => setTelBeneficiario(e.target.value)}
                      className='rounded p-2 text-sm w-1/2 text-center'
                      placeholder='Telefone' />
                  </div>
                </div>
              </Card>
            </div>

            <div id='details' className='flex gap-5'>
              <Card id='description' className='flex-1 p-4'>
                <h1 className='font-semibold ml-1 mb-1'>Descrição do Serviço/Produto</h1>
                <Textarea
                  className='w-full rounded p-2 text-sm'
                  placeholder='Descreva aqui'
                  value={description}
                  onChange={e => setDescription(e.target.value)} />
              </Card>

              <Card id='observation' className='flex-1 p-4'>
                <h1 className='font-semibold ml-1 mb-1'>Observação:</h1>
                <Textarea
                  className='w-full rounded p-2 text-sm'
                  placeholder='Descreva aqui'
                  value={observation}
                  onChange={e => setObservation(e.target.value)} />
              </Card>
            </div>

            <div id='valueLocation' className='flex gap-5'>
              <Card id='values' className='p-4 w-3/12'>
                <h1 className='font-semibold ml-1 mb-1'>Valor</h1>
                <Input
                  type="number"
                  value={receiptValue}
                  onChange={e => setReceiptValue(e.target.value)}
                  className='rounded p-2 text-sm'
                  placeholder='R$' />
              </Card>

              <Card className='p-4'>
                <h1 className='font-semibold ml-1 mb-1'>Local e Data</h1>
                <div className='flex gap-2'>
                  <Input
                    type="text"
                    value={stateUF}
                    onChange={e => setStateUF(e.target.value)}
                    className='rounded p-2 text-sm w-1/3 text-center'
                    placeholder='Estado' />
                  <Input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className='rounded p-2 text-sm w-1/3 text-center'
                    placeholder='Município' />
                  <Input
                    type="date"
                    value={dataDay}
                    onChange={e => setDataDay(e.target.value)}
                    className='rounded p-2 text-sm w-1/3 text-center'
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
                {parseFloat(receiptValue).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </p>

              <p className='text-justify mb-20'>
                Eu, <span className='font-semibold'>{benefiario}</span>, CPF nº <span className='font-semibold'>{insertMaskCPF(cpfBeneficiario)}</span>, Telefone: {telBeneficiario}, DECLARO que recebi do Sr.(a) <span className='font-semibold'>{pagador}</span>, CPF nº <span className='font-semibold'>{insertMaskCPF(cpfPagador)}</span>, Telefone: {telPagador}, a quantia de {parseFloat(receiptValue).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} ({numero.porExtenso(receiptValue, numero.estilo.monetario)}), referente ao pagamento {description}.
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
                <p>{benefiario}</p>
                <p>CPF: {cpfBeneficiario}</p>
              </div>
            </div>

            <div className='flex justify-center items-center'>
              <Button onClick={openPDF}>Gerar Recibo</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      <footer className='p-8 flex flex-col items-center justify-center text-xs'>
        <p>Desenvolvido por Patrick Lima</p>
        <p>(98) 98334-2518</p>
        <p>Instagram: @patricklimax</p>
      </footer>
    </main>
  );
}
