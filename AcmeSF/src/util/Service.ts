export interface Service<T> {
    buscarPeloId(id: number): Promise<T>;
    buscarTodos(): Promise<T[]>;
}