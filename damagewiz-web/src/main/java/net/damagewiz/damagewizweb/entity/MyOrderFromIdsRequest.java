package net.damagewiz.damagewizweb.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyOrderFromIdsRequest {
    private String username;
    private List<Long> carPartIds;
}
