package edu.infosys.lostFoundLocatorApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItemId;

public interface MatchItemRepository extends JpaRepository<MatchItem,MatchItemId>{
	
}