
IF OBJECT_ID('fn_seq_tbl_ad_vehicle') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_vehicle
IF OBJECT_ID('sp_tbl_ad_vehicle') IS NOT NULL DROP PROCEDURE sp_tbl_ad_vehicle
GO
CREATE FUNCTION fn_seq_tbl_ad_vehicle()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_vehicle),0)+1 FROM tbl_ad_vehicle
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_vehicle
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_vehicle INT = NULL,
  @Id_location INT = NULL,
  @Id_make INT = NULL,
  @Id_model INT = NULL,
  @Id_type INT = NULL,
  @Id_year INT = NULL,
  @Id_color INT = NULL,
  @Id_manager INT = NULL,
  @Id_state INT = NULL,
  @Id_inventory_state INT = NULL,
  @Id_supplier INT = NULL,
  @code NVARCHAR(20) = NULL,
  @policy NVARCHAR(20) = NULL,
  @comment NVARCHAR(255) = NULL,
  @mileage_service INT = NULL,
  @mileage_alert INT = NULL,
  @mileage_current INT = NULL,
  @mileage_date_read DATETIME = NULL,
  @mileage_service_applied INT = NULL,
  @mileage_service_applied_date DATETIME = NULL,
  @mileage_service_next INT = NULL,
  @purchace_price NUMERIC(19,10) = NULL,
  @depreciation NUMERIC(19,10) = NULL,
  @circulation_card NVARCHAR(50) = NULL,
  @title NVARCHAR(50) = NULL,
  @engine NVARCHAR(50) = NULL,
  @chassis NVARCHAR(50) = NULL,
  @inactivation_date DATETIME = NULL,
  @image1 NVARCHAR(255) = NULL,
  @image2 NVARCHAR(255) = NULL,
  @image3 NVARCHAR(255) = NULL,
  @image4 NVARCHAR(255) = NULL,
  @image5 NVARCHAR(255) = NULL,
  @image6 NVARCHAR(255) = NULL,
  @date_mod DATETIME = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_vehicle,
    A.Id_location,
    A.Id_make,
    A.Id_model,
    A.Id_type,
    A.Id_year,
    A.Id_color,
    A.Id_manager,
    A.Id_state,
    A.Id_inventory_state,
    A.Id_supplier,
    A.code,
    A.policy,
    A.comment,
    A.mileage_service,
    A.mileage_alert,
    A.mileage_current,
    A.mileage_date_read,
    A.mileage_service_applied,
    A.mileage_service_applied_date,
    A.mileage_service_next,
    A.purchace_price,
    A.depreciation,
    A.circulation_card,
    A.title,
    A.engine,
    A.chassis,
    A.inactivation_date,
    A.image1,
    A.image2,
    A.image3,
    A.image4,
    A.image5,
    A.image6,
    A.date_mod,
    A.user_mod,
    A.active
    FROM tbl_ad_vehicle A WHERE 1 = 1
    AND (COALESCE(@Id_vehicle,A.Id_vehicle) = A.Id_vehicle OR @Id_vehicle IS NULL)
    AND (COALESCE(@Id_location,A.Id_location) = A.Id_location OR @Id_location IS NULL)
    AND (COALESCE(@Id_make,A.Id_make) = A.Id_make OR @Id_make IS NULL)
    AND (COALESCE(@Id_model,A.Id_model) = A.Id_model OR @Id_model IS NULL)
    AND (COALESCE(@Id_type,A.Id_type) = A.Id_type OR @Id_type IS NULL)
    AND (COALESCE(@Id_year,A.Id_year) = A.Id_year OR @Id_year IS NULL)
    AND (COALESCE(@Id_color,A.Id_color) = A.Id_color OR @Id_color IS NULL)
    AND (COALESCE(@Id_manager,A.Id_manager) = A.Id_manager OR @Id_manager IS NULL)
    AND (COALESCE(@Id_state,A.Id_state) = A.Id_state OR @Id_state IS NULL)
    AND (COALESCE(@Id_inventory_state,A.Id_inventory_state) = A.Id_inventory_state OR @Id_inventory_state IS NULL)
    AND (COALESCE(@Id_supplier,A.Id_supplier) = A.Id_supplier OR @Id_supplier IS NULL)
    AND (COALESCE(@code,A.code) = A.code OR @code IS NULL)
    AND (COALESCE(@policy,A.policy) = A.policy OR @policy IS NULL)
    AND (COALESCE(@comment,A.comment) = A.comment OR @comment IS NULL)
    AND (COALESCE(@mileage_service,A.mileage_service) = A.mileage_service OR @mileage_service IS NULL)
    AND (COALESCE(@mileage_alert,A.mileage_alert) = A.mileage_alert OR @mileage_alert IS NULL)
    AND (COALESCE(@mileage_current,A.mileage_current) = A.mileage_current OR @mileage_current IS NULL)
    AND (COALESCE(@mileage_date_read,A.mileage_date_read) = A.mileage_date_read OR @mileage_date_read IS NULL)
    AND (COALESCE(@mileage_service_applied,A.mileage_service_applied) = A.mileage_service_applied OR @mileage_service_applied IS NULL)
    AND (COALESCE(@mileage_service_applied_date,A.mileage_service_applied_date) = A.mileage_service_applied_date OR @mileage_service_applied_date IS NULL)
    AND (COALESCE(@mileage_service_next,A.mileage_service_next) = A.mileage_service_next OR @mileage_service_next IS NULL)
    AND (COALESCE(@purchace_price,A.purchace_price) = A.purchace_price OR @purchace_price IS NULL)
    AND (COALESCE(@depreciation,A.depreciation) = A.depreciation OR @depreciation IS NULL)
    AND (COALESCE(@circulation_card,A.circulation_card) = A.circulation_card OR @circulation_card IS NULL)
    AND (COALESCE(@title,A.title) = A.title OR @title IS NULL)
    AND (COALESCE(@engine,A.engine) = A.engine OR @engine IS NULL)
    AND (COALESCE(@chassis,A.chassis) = A.chassis OR @chassis IS NULL)
    AND (COALESCE(@inactivation_date,A.inactivation_date) = A.inactivation_date OR @inactivation_date IS NULL)
    AND (COALESCE(@image1,A.image1) = A.image1 OR @image1 IS NULL)
    AND (COALESCE(@image2,A.image2) = A.image2 OR @image2 IS NULL)
    AND (COALESCE(@image3,A.image3) = A.image3 OR @image3 IS NULL)
    AND (COALESCE(@image4,A.image4) = A.image4 OR @image4 IS NULL)
    AND (COALESCE(@image5,A.image5) = A.image5 OR @image5 IS NULL)
    AND (COALESCE(@image6,A.image6) = A.image6 OR @image6 IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_vehicle ON
      
      SET @Id_vehicle = dbo.fn_seq_tbl_ad_vehicle()
      INSERT INTO tbl_ad_vehicle(
      Id_vehicle,
      Id_location,
      Id_make,
      Id_model,
      Id_type,
      Id_year,
      Id_color,
      Id_manager,
      Id_state,
      Id_inventory_state,
      Id_supplier,
      code,
      policy,
      comment,
      mileage_service,
      mileage_alert,
      mileage_current,
      mileage_date_read,
      mileage_service_applied,
      mileage_service_applied_date,
      mileage_service_next,
      purchace_price,
      depreciation,
      circulation_card,
      title,
      engine,
      chassis,
      inactivation_date,
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      date_mod,
      user_mod,
      active
      )
      VALUES(
      @Id_vehicle,
      @Id_location,
      @Id_make,
      @Id_model,
      @Id_type,
      @Id_year,
      @Id_color,
      @Id_manager,
      @Id_state,
      @Id_inventory_state,
      @Id_supplier,
      @code,
      @policy,
      @comment,
      @mileage_service,
      @mileage_alert,
      @mileage_current,
      @mileage_date_read,
      @mileage_service_applied,
      @mileage_service_applied_date,
      @mileage_service_next,
      @purchace_price,
      @depreciation,
      @circulation_card,
      @title,
      @engine,
      @chassis,
      @inactivation_date,
      @image1,
      @image2,
      @image3,
      @image4,
      @image5,
      @image6,
      @date_mod,
      @user_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_vehicle A 
      WHERE A.Id_vehicle = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_vehicle OFF
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
    A.Id_location = @Id_location,
    A.Id_make = @Id_make,
    A.Id_model = @Id_model,
    A.Id_type = @Id_type,
    A.Id_year = @Id_year,
    A.Id_color = @Id_color,
    A.Id_manager = @Id_manager,
    A.Id_state = @Id_state,
    A.Id_inventory_state = @Id_inventory_state,
    A.Id_supplier = @Id_supplier,
    A.code = @code,
    A.policy = @policy,
    A.comment = @comment,
    A.mileage_service = @mileage_service,
    A.mileage_alert = @mileage_alert,
    A.mileage_current = @mileage_current,
    A.mileage_date_read = @mileage_date_read,
    A.mileage_service_applied = @mileage_service_applied,
    A.mileage_service_applied_date = @mileage_service_applied_date,
    A.mileage_service_next = @mileage_service_next,
    A.purchace_price = @purchace_price,
    A.depreciation = @depreciation,
    A.circulation_card = @circulation_card,
    A.title = @title,
    A.engine = @engine,
    A.chassis = @chassis,
    A.inactivation_date = @inactivation_date,
    A.image1 = @image1,
    A.image2 = @image2,
    A.image3 = @image3,
    A.image4 = @image4,
    A.image5 = @image5,
    A.image6 = @image6,
    A.date_mod = @date_mod,
    A.user_mod = @user_mod,
    A.active = @active
    FROM tbl_ad_vehicle A
    WHERE A.Id_vehicle = @Id_vehicle
    
    SELECT A.* FROM tbl_ad_vehicle A 
    WHERE A.Id_vehicle = @Id_vehicle
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_vehicle
    WHERE Id_vehicle = @Id_vehicle
    
    SELECT @Id_vehicle Id_vehicle
  END
  
SET NOCOUNT OFF
