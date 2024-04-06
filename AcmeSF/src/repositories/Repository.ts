export interface Repository<T> {
    buscarPeloId(id: number): Promise<T>;
    buscarTodos(): Promise<T[]>;
}