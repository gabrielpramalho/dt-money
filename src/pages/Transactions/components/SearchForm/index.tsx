import { SearchFormContainer } from "./styles";
import { MagnifyingGlass } from '@phosphor-icons/react'

export function SearchForm(){
    return(
        <SearchFormContainer>
            <input type="text" placeholder="Busque por transações" />

            <button type="submit">
                <MagnifyingGlass size={20} />
                <span>Buscar</span>
            </button>
        </SearchFormContainer>
    )
}