'use client'
import { useState } from 'react';

export default function Home() {
  const [benefiario, setBenefiario] = useState('')
  const [cpfBeneficiario, setCpfBeneficiario] = useState('')
  const [stateUF, setStateUF] = useState('')
  const [city, setCity] = useState('')
  const [pagador, setPagador] = useState('')
  const [cpfPagador, setCpfPagador] = useState('')
  const [telPagador, setTelPagador] = useState('')
  const [description, setDescription] = useState('')
  const [observation, setObservation] = useState('')


  return (
    <main className="flex min-h-screen flex-col gap-2 p-2 py-6 bg-zinc-100">
      <h1 className='w-full flex justify-center items-center font-bold text-2xl'>
        EMISSOR DE RECIBO EM PDF
      </h1>

      <div className='w-full flex h-full gap-10 px-10'>
        <div className='w-1/2 flex flex-col p-4 border rounded'>
          <h1 className='text-center font-semibold text-3xl uppercase bg-zinc-900 text-zinc-200'>
            Dados do Recibo
          </h1>
          <div className='flex flex-col gap-2 py-2'>
            <div >
              <h1 className='font-semibold ml-1'>
                Dados do Beneficiário:
              </h1>
              <div className='flex flex-col gap-2'>
                <input
                  type="text"
                  value={benefiario}
                  onChange={e => setBenefiario(e.target.value)}
                  className='rounded p-2 text-sm w-full'
                  placeholder='Informe o nome do Beneficiário' />

                <div className='flex gap-2 '>
                  <input
                    type="number"
                    value={cpfBeneficiario}
                    onChange={e => setCpfBeneficiario(e.target.value)}
                    className='rounded p-2 text-sm w-1/3'
                    placeholder='CPF do Beneficiário' />

                  <input
                    type="text"
                    value={stateUF}
                    onChange={e => setStateUF(e.target.value)}
                    className='rounded p-2 text-sm w-1/3'
                    placeholder='Estado' />
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className='rounded p-2 text-sm w-1/3'
                    placeholder='Município' />
                </div>
              </div>
            </div>

            <div >
              <h1 className='font-semibold ml-1'>Dados do Pagador</h1>
              <div className='flex flex-col gap-2'>
                <input
                  type="text"
                  value={pagador}
                  onChange={e => setPagador(e.target.value)}
                  className='rounded p-2 text-sm w-full'
                  placeholder='Nome do Pagador' />

                <div className='flex gap-2'>
                  <input
                    type="number"
                    value={cpfPagador}
                    onChange={e => setCpfPagador(e.target.value)}
                    className='rounded p-2 text-sm w-1/2'
                    placeholder='CPF do Pagador' />
                  <input
                    type="number"
                    value={telPagador}
                    onChange={e => setTelPagador(e.target.value)}
                    className='rounded p-2 text-sm w-1/2'
                    placeholder='Telefone do Pagador' />
                </div>
              </div>
            </div>

            <div >
              <h1 className='font-semibold ml-1'>Descrição do Serviço/Produto</h1>
              <div className='flex flex-col '>
                <div>
                  <textarea
                    className='w-full rounded p-2 text-sm'
                    placeholder='Descreva aqui'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            <div >
              <h1 className='font-semibold ml-1'>Observação</h1>
              <div className='flex flex-col '>
                <div>
                  <textarea
                    className='w-full rounded p-2 text-sm'
                    placeholder='Descreva aqui'
                    value={observation}
                    onChange={e => setObservation(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-1/2 h-full flex flex-col p-4 border rounded bg-zinc-200'>
          <h1 className='text-center font-semibold text-3xl uppercase bg-zinc-900 text-zinc-200'>
            Seu recibo ficará assim
          </h1>
          <div className='flex flex-col gap-4'>
            <h1 className='text-3xl text-center font-semibold'>Recibo de Pagamento</h1>
            <p className='text-right font-semibold text-2xl'>R$ 500,00</p>
            <p className='text-justify'>
              Eu, <span className='font-semibold'>{benefiario}</span>, CPF nº {cpfBeneficiario}, DECLARO que recebi do Sr.(a) {pagador}, CPF nº {cpfPagador}, <span>Telefone: {telPagador},</span> a quantia de R$ 500,00 (quinhentos reais), referente ao pagamento {description}.
            </p>

            <div>
              <p>Observação:</p>
              {observation}
            </div>

            <p className='mt-5 text-center'>{city}, {stateUF}, 25 de maio de 2024.</p>
            <div className='text-center mt-5'>
              <p>{benefiario}</p>
              <p>CPF: {cpfBeneficiario}</p>
            </div>

          </div>
          <div className='p-10 flex justify-center items-center'>
            GERAR RECIBO EM PDF
          </div>
        </div>
      </div>
    </main>
  );
}
