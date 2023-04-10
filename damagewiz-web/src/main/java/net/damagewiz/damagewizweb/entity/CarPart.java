package net.damagewiz.damagewizweb.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "car_parts")
public class CarPart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="car_id")
    private Car car;
    @ManyToOne
    @JoinColumn(name="mechanic_id")
    private Mechanic mechanic;
    @Column(name ="name")
    private String part_name;
    @Column(nullable = false)
    private int price;
    @Column(nullable = false)
    private int laborCost;

}
