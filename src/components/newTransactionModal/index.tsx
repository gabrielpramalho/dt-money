import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import * as z from 'zod'

import { ArrowCircleDown, ArrowCircleUp, X } from '@phosphor-icons/react'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})


type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>


export function NewTransactionModal(){

    const {
        register,
        handleSubmit,
        control,
        formState: {
            isSubmitting,
        }
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
    })

    function handleCreateNewTransaction(data: NewTransactionFormInputs){
        console.log(data)
    }

    return(
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>


                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type="text" 
                        placeholder='Descrição' 
                        required
                        {...register('description')} 
                    />
                    <input 
                        type="number" 
                        placeholder='Preço' 
                        required
                        {...register('price', { valueAsNumber: true })} 
                    />
                    <input 
                        type="text" 
                        placeholder='Categoria' 
                        required
                        {...register('category')} 
                    />

                    <Controller 
                        control={control}
                        name='type'
                        render={({ field }) => {
                            return(
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton value='income' variant='income'>
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>
                                    <TransactionTypeButton value='outcome' variant='outcome'>
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
            
                                </TransactionType>
                            )
                        }}
                    
                    />


                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>

                </form>

            </Content>
        </Dialog.Portal>
    )
}