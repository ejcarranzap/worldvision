
IF OBJECT_ID('fn_seq_tbl_ad_repair') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_repair
IF OBJECT_ID('sp_tbl_ad_repair') IS NOT NULL DROP PROCEDURE sp_tbl_ad_repair
GO
CREATE FUNCTION fn_seq_tbl_ad_repair()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_repair),0)+1 FROM tbl_ad_repair
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_repair
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_repair INT = NULL,
  @Id_vehicle INT = NULL,
  @Id_supplier INT = NULL,
  @Id_maintenance_type INT = NULL,
  @invoice NVARCHAR(50) = NULL,
  @price NUMERIC(19,10) = NULL,
  @comment NVARCHAR(255) = NULL,
  @mileage_service_next INT = NULL,
  @mileage_service_current INT = NULL,
  @has_history INT = NULL,
  @is_clean INT = NULL,
  @has_fuel INT = NULL,
  @date_mod DATETIME = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_repair,
    A.Id_vehicle,
    A.Id_supplier,
    A.Id_maintenance_type,
    A.invoice,
    A.price,
    A.comment,
    A.mileage_service_next,
    A.mileage_service_current,
    A.has_history,
    A.is_clean,
    A.has_fuel,
    A.date_mod,
    A.user_mod,
    A.active
    FROM tbl_ad_repair A WHERE 1 = 1
    AND (COALESCE(@Id_repair,A.Id_repair) = A.Id_repair OR @Id_repair IS NULL)
    AND (COALESCE(@Id_vehicle,A.Id_vehicle) = A.Id_vehicle OR @Id_vehicle IS NULL)
    AND (COALESCE(@Id_supplier,A.Id_supplier) = A.Id_supplier OR @Id_supplier IS NULL)
    AND (COALESCE(@Id_maintenance_type,A.Id_maintenance_type) = A.Id_maintenance_type OR @Id_maintenance_type IS NULL)
    AND (COALESCE(@invoice,A.invoice) = A.invoice OR @invoice IS NULL)
    AND (COALESCE(@price,A.price) = A.price OR @price IS NULL)
    AND (COALESCE(@comment,A.comment) = A.comment OR @comment IS NULL)
    AND (COALESCE(@mileage_service_next,A.mileage_service_next) = A.mileage_service_next OR @mileage_service_next IS NULL)
    AND (COALESCE(@mileage_service_current,A.mileage_service_current) = A.mileage_service_current OR @mileage_service_current IS NULL)
    AND (COALESCE(@has_history,A.has_history) = A.has_history OR @has_history IS NULL)
    AND (COALESCE(@is_clean,A.is_clean) = A.is_clean OR @is_clean IS NULL)
    AND (COALESCE(@has_fuel,A.has_fuel) = A.has_fuel OR @has_fuel IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_repair ON
      
      SET @Id_repair = dbo.fn_seq_tbl_ad_repair()
      INSERT INTO tbl_ad_repair(
      Id_repair,
      Id_vehicle,
      Id_supplier,
      Id_maintenance_type,
      invoice,
      price,
      comment,
      mileage_service_next,
      mileage_service_current,
      has_history,
      is_clean,
      has_fuel,
      date_mod,
      user_mod,
      active
      )
      VALUES(
      @Id_repair,
      @Id_vehicle,
      @Id_supplier,
      @Id_maintenance_type,
      @invoice,
      @price,
      @comment,
      @mileage_service_next,
      @mileage_service_current,
      @has_history,
      @is_clean,
      @has_fuel,
      @date_mod,
      @user_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_repair A 
      WHERE A.Id_repair = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_repair OFF
    COMMIT
    END TRY
    BEGIN CATCH
      ROLLBACK
      SET @MSG = ERROR_MESSAGE() + ' ERRLINE > ' + ERROR_LINE() + 'ERRNUMBER > ' + ERROR_NUMBER()
      RAISERROR(@MSG,18,0)
    END CATCH
  END
  
  IF ISNULL(@ACTION,'') = 'U'
  BEGIN
    UPDATE A SET
    A.Id_vehicle = @Id_vehicle,
    A.Id_supplier = @Id_supplier,
    A.Id_maintenance_type = @Id_maintenance_type,
    A.invoice = @invoice,
    A.price = @price,
    A.comment = @comment,
    A.mileage_service_next = @mileage_service_next,
    A.mileage_service_current = @mileage_service_current,
    A.has_history = @has_history,
    A.is_clean = @is_clean,
    A.has_fuel = @has_fuel,
    A.date_mod = @date_mod,
    A.user_mod = @user_mod,
    A.active = @active
    FROM tbl_ad_repair A
    WHERE A.Id_repair = @Id_repair
    
    SELECT A.* FROM tbl_ad_repair A 
    WHERE A.Id_repair = @Id_repair
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_repair
    WHERE Id_repair = @Id_repair
    
    SELECT @Id_repair Id_repair
  END
  
SET NOCOUNT OFF
