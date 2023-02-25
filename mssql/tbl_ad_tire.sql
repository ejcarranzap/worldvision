
IF OBJECT_ID('fn_seq_tbl_ad_tire') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_tire
IF OBJECT_ID('sp_tbl_ad_tire') IS NOT NULL DROP PROCEDURE sp_tbl_ad_tire
GO
CREATE FUNCTION fn_seq_tbl_ad_tire()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_tire),0)+1 FROM tbl_ad_tire
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_tire
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_tire INT = NULL,
  @Id_vehicle INT = NULL,
  @Id_tire_make INT = NULL,
  @Id_supplier INT = NULL,
  @invoice NVARCHAR(50) = NULL,
  @rin NVARCHAR(50) = NULL,
  @purchace_date DATETIME = NULL,
  @price NUMERIC(19,10) = NULL,
  @comment NVARCHAR(255) = NULL,
  @mileage INT = NULL,
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
    A.Id_tire,
    A.Id_vehicle,
    A.Id_tire_make,
    A.Id_supplier,
    A.invoice,
    A.rin,
    A.purchace_date,
    A.price,
    A.comment,
    A.mileage,
    A.inactivation_date,
    A.date_mod,
    A.user_mod,
    A.active
    FROM tbl_ad_tire A WHERE 1 = 1
    AND (COALESCE(@Id_tire,A.Id_tire) = A.Id_tire OR @Id_tire IS NULL)
    AND (COALESCE(@Id_vehicle,A.Id_vehicle) = A.Id_vehicle OR @Id_vehicle IS NULL)
    AND (COALESCE(@Id_tire_make,A.Id_tire_make) = A.Id_tire_make OR @Id_tire_make IS NULL)
    AND (COALESCE(@Id_supplier,A.Id_supplier) = A.Id_supplier OR @Id_supplier IS NULL)
    AND (COALESCE(@invoice,A.invoice) = A.invoice OR @invoice IS NULL)
    AND (COALESCE(@rin,A.rin) = A.rin OR @rin IS NULL)
    AND (COALESCE(@purchace_date,A.purchace_date) = A.purchace_date OR @purchace_date IS NULL)
    AND (COALESCE(@price,A.price) = A.price OR @price IS NULL)
    AND (COALESCE(@comment,A.comment) = A.comment OR @comment IS NULL)
    AND (COALESCE(@mileage,A.mileage) = A.mileage OR @mileage IS NULL)
    AND (COALESCE(@inactivation_date,A.inactivation_date) = A.inactivation_date OR @inactivation_date IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_tire ON
      
      SET @Id_tire = dbo.fn_seq_tbl_ad_tire()
      INSERT INTO tbl_ad_tire(
      Id_tire,
      Id_vehicle,
      Id_tire_make,
      Id_supplier,
      invoice,
      rin,
      purchace_date,
      price,
      comment,
      mileage,
      inactivation_date,
      date_mod,
      user_mod,
      active
      )
      VALUES(
      @Id_tire,
      @Id_vehicle,
      @Id_tire_make,
      @Id_supplier,
      @invoice,
      @rin,
      @purchace_date,
      @price,
      @comment,
      @mileage,
      @inactivation_date,
      @date_mod,
      @user_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_tire A 
      WHERE A.Id_tire = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_tire OFF
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
    A.Id_tire_make = @Id_tire_make,
    A.Id_supplier = @Id_supplier,
    A.invoice = @invoice,
    A.rin = @rin,
    A.purchace_date = @purchace_date,
    A.price = @price,
    A.comment = @comment,
    A.mileage = @mileage,
    A.inactivation_date = @inactivation_date,
    A.date_mod = @date_mod,
    A.user_mod = @user_mod,
    A.active = @active
    FROM tbl_ad_tire A
    WHERE A.Id_tire = @Id_tire
    
    SELECT A.* FROM tbl_ad_tire A 
    WHERE A.Id_tire = @Id_tire
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_tire
    WHERE Id_tire = @Id_tire
    
    SELECT @Id_tire Id_tire
  END
  
SET NOCOUNT OFF
