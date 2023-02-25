
IF OBJECT_ID('fn_seq_tbl_ad_battery') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_battery
IF OBJECT_ID('sp_tbl_ad_battery') IS NOT NULL DROP PROCEDURE sp_tbl_ad_battery
GO
CREATE FUNCTION fn_seq_tbl_ad_battery()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_battery),0)+1 FROM tbl_ad_battery
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_battery
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_battery INT = NULL,
  @Id_vehicle INT = NULL,
  @Id_supplier INT = NULL,
  @Id_battery_make INT = NULL,
  @Id_battery_type INT = NULL,
  @invoice NVARCHAR(50) = NULL,
  @purchace_date DATETIME = NULL,
  @purchace_price NUMERIC(19,10) = NULL,
  @cells INT = NULL,
  @comment NVARCHAR(255) = NULL,
  @due_date DATETIME = NULL,
  @inactivation_date DATETIME = NULL,
  @date_mod DATETIME = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_battery,
    A.Id_vehicle,
    A.Id_supplier,
    A.Id_battery_make,
    A.Id_battery_type,
    A.invoice,
    A.purchace_date,
    A.purchace_price,
    A.cells,
    A.comment,
    A.due_date,
    A.inactivation_date,
    A.date_mod,
    A.user_mod,
    A.active
    FROM tbl_ad_battery A WHERE 1 = 1
    AND (COALESCE(@Id_battery,A.Id_battery) = A.Id_battery OR @Id_battery IS NULL)
    AND (COALESCE(@Id_vehicle,A.Id_vehicle) = A.Id_vehicle OR @Id_vehicle IS NULL)
    AND (COALESCE(@Id_supplier,A.Id_supplier) = A.Id_supplier OR @Id_supplier IS NULL)
    AND (COALESCE(@Id_battery_make,A.Id_battery_make) = A.Id_battery_make OR @Id_battery_make IS NULL)
    AND (COALESCE(@Id_battery_type,A.Id_battery_type) = A.Id_battery_type OR @Id_battery_type IS NULL)
    AND (COALESCE(@invoice,A.invoice) = A.invoice OR @invoice IS NULL)
    AND (COALESCE(@purchace_date,A.purchace_date) = A.purchace_date OR @purchace_date IS NULL)
    AND (COALESCE(@purchace_price,A.purchace_price) = A.purchace_price OR @purchace_price IS NULL)
    AND (COALESCE(@cells,A.cells) = A.cells OR @cells IS NULL)
    AND (COALESCE(@comment,A.comment) = A.comment OR @comment IS NULL)
    AND (COALESCE(@due_date,A.due_date) = A.due_date OR @due_date IS NULL)
    AND (COALESCE(@inactivation_date,A.inactivation_date) = A.inactivation_date OR @inactivation_date IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_battery ON
      
      SET @Id_battery = dbo.fn_seq_tbl_ad_battery()
      INSERT INTO tbl_ad_battery(
      Id_battery,
      Id_vehicle,
      Id_supplier,
      Id_battery_make,
      Id_battery_type,
      invoice,
      purchace_date,
      purchace_price,
      cells,
      comment,
      due_date,
      inactivation_date,
      date_mod,
      user_mod,
      active
      )
      VALUES(
      @Id_battery,
      @Id_vehicle,
      @Id_supplier,
      @Id_battery_make,
      @Id_battery_type,
      @invoice,
      @purchace_date,
      @purchace_price,
      @cells,
      @comment,
      @due_date,
      @inactivation_date,
      @date_mod,
      @user_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_battery A 
      WHERE A.Id_battery = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_battery OFF
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
    A.Id_battery_make = @Id_battery_make,
    A.Id_battery_type = @Id_battery_type,
    A.invoice = @invoice,
    A.purchace_date = @purchace_date,
    A.purchace_price = @purchace_price,
    A.cells = @cells,
    A.comment = @comment,
    A.due_date = @due_date,
    A.inactivation_date = @inactivation_date,
    A.date_mod = @date_mod,
    A.user_mod = @user_mod,
    A.active = @active
    FROM tbl_ad_battery A
    WHERE A.Id_battery = @Id_battery
    
    SELECT A.* FROM tbl_ad_battery A 
    WHERE A.Id_battery = @Id_battery
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_battery
    WHERE Id_battery = @Id_battery
    
    SELECT @Id_battery Id_battery
  END
  
SET NOCOUNT OFF
