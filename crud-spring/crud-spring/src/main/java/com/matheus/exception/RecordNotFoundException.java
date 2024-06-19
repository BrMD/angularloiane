package com.matheus.exception;

public class RecordNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public RecordNotFoundException(Long id){
        super("Registro nao encontrado com o id: " + id);
    }
    
}
