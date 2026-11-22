package com.smartcare.pharmacyservice.service;

import com.smartcare.pharmacyservice.model.Stock;
import com.smartcare.pharmacyservice.repository.StockRepository;
import com.smartcare.pharmacyservice.repository.MedicationRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StockService {

    private final StockRepository stockRepository;
    private final MedicationRepository medicationRepository;
    private final MongoTemplate mongoTemplate;

    public StockService(
            StockRepository stockRepository,
            MedicationRepository medicationRepository,
            MongoTemplate mongoTemplate) {
        this.stockRepository = stockRepository;
        this.medicationRepository = medicationRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public Stock create(Stock stock) {
        if (!medicationRepository.existsById(stock.getMedicationId())) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Medicament introuvable");
        }

        if (stockRepository.existsByMedicationId(stock.getMedicationId())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Stock deja existant");
        }

        stock.setId(null);
        stock.setQuantity(0);
        stock.setLastUpdated(LocalDateTime.now());
        return stockRepository.save(stock);
    }

    public List<Stock> findAll() {
        return stockRepository.findAll();
    }

    public Stock findById(String id) {
        return stockRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Stock introuvable"));
    }

    public Stock addStock(String id, int quantity) {
        if (quantity <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Quantite invalide");
        }

        Query query = Query.query(Criteria.where("_id").is(id));

        Update update = new Update()
                .inc("quantity", quantity)
                .set("lastUpdated", LocalDateTime.now());

        Stock stock = mongoTemplate.findAndModify(
                query,
                update,
                FindAndModifyOptions.options().returnNew(true),
                Stock.class
        );

        if (stock == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Stock introuvable");
        }

        return stock;
    }

    public Stock removeStock(String id, int quantity) {
        if (quantity <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Quantite invalide");
        }

        Query query = new Query(
                Criteria.where("_id").is(id)
                        .and("quantity").gte(quantity)
        );

        Update update = new Update()
                .inc("quantity", -quantity)
                .set("lastUpdated", LocalDateTime.now());

        Stock stock = mongoTemplate.findAndModify(
                query,
                update,
                FindAndModifyOptions.options().returnNew(true),
                Stock.class
        );

        if (stock == null) {
            if (!stockRepository.existsById(id)) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Stock introuvable");
            }
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Stock insuffisant");
        }

        return stock;
    }


    public List<Stock> getLowStocks() {
        org.bson.Document expression = new org.bson.Document(
                "$lte", java.util.List.of("$quantity", "$minimumQuantity")
        );

        Query query = new BasicQuery(
                new org.bson.Document("$expr", expression)
        );

        return mongoTemplate.find(query, Stock.class);
    }

}
