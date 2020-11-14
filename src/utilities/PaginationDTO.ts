export class PaginationDTO {
    private page: number;
    perPage: number;

    constructor(page: number, perPage: number) {
        this.page = page;
        this.perPage = perPage;
    }

    /**
     * este metodo devuelve true si ambos 
     * valores page y perPage estan definidos
     */
    get isValid(): boolean {
        if (this.page!=null && this.perPage!=null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * devuelve el valor offset que debe ser usado en el query
     * para la paginacion de resultados. 
     */
    get offSet(): number {
        if (this.page!=null && this.perPage!=null) {
            return (this.page-1)*this.perPage;           
        }
    }


}

/**
 * 
 * perpage 3
 * 
 * pagina 1 offset 0
 * pagina 2 ofsset 3
 * pagina 3 offset 6
 */