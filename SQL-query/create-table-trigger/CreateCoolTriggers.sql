CREATE TRIGGER addCool
AFTER INSERT ON coolHistory
FOR EACH ROW
    UPDATE review
    SET reviewCount = reviewCount + 1,
		cool = cool + 1
    WHERE review.rid = NEW.rid

CREATE TRIGGER subCool
BEFORE DELETE ON coolHistory
FOR EACH ROW
    UPDATE review
    SET reviewCount = reviewCount - 1,
		cool = cool + 1
    WHERE review.rid = OLD.rid
