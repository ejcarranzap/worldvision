
IF OBJECT_ID('fn_seq_tbl_ad_mileage') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_mileage
IF OBJECT_ID('sp_tbl_ad_mileage') IS NOT NULL DROP PROCEDURE sp_tbl_ad_mileage
GO
CREATE FUNCTION fn_seq_tbl_ad_mileage()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_mileage),0)+1 FROM tbl_ad_mileage
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_mileage
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_mileage INT = NULL,
  @Id_vehicle INT = NULL,
  @Id_fuel_type INT = NULL,
  @mileage_date DATETIME = NULL,
  @mileage_current INT = NULL,
  @name NVARCHAR(50) = NULL,
  @comment NVARCHAR(255) = NULL,
  @has_history INT = NULL,
  @is_clean INT = NULL,
  @has_fuel INT = NULL,
  @circulation_card NVARCHAR(50) = NULL,
  @light INT = NULL,
  @date_mod DATETIME = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_mileage,
    A.Id_vehicle,
    A.Id_fuel_type,
    A.mileage_date,
    A.mileage_current,
    A.name,
    A.comment,
    A.has_history,
    A.is_clean,
    A.has_fuel,
    A.circulation_card,
    A.light,
    A.date_mod,
    A.user_mod,
    A.active
    FROM tbl_ad_mileage A WHERE 1 = 1
    AND (COALESCE(@Id_mileage,A.Id_mileage) = A.Id_mileage OR @Id_mileage IS NULL)
    AND (COALESCE(@Id_vehicle,A.Id_vehicle) = A.Id_vehicle OR @Id_vehicle IS NULL)
    AND (COALESCE(@Id_fuel_type,A.Id_fuel_type) = A.Id_fuel_type OR @Id_fuel_type IS NULL)
    AND (COALESCE(@mileage_date,A.mileage_date) = A.mileage_date OR @mileage_date IS NULL)
    AND (COALESCE(@mileage_current,A.mileage_current) = A.mileage_current OR @mileage_current IS NULL)
    AND (COALESCE(@name,A.name) = A.name OR @name IS NULL)
    AND (COALESCE(@comment,A.comment) = A.comment OR @comment IS NULL)
    AND (COALESCE(@has_history,A.has_history) = A.has_history OR @has_history IS NULL)
    AND (COALESCE(@is_clean,A.is_clean) = A.is_clean OR @is_clean IS NULL)
    AND (COALESCE(@has_fuel,A.has_fuel) = A.has_fuel OR @has_fuel IS NULL)
    AND (COALESCE(@circulation_card,A.circulation_card) = A.circulation_card OR @circulation_card IS NULL)
    AND (COALESCE(@light,A.light) = A.light OR @light IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_mileage ON
      
      SET @Id_mileage = dbo.fn_seq_tbl_ad_mileage()
      INSERT INTO tbl_ad_mileage(
      Id_mileage,
      Id_vehicle,
      Id_fuel_type,
      mileage_date,
      mileage_current,
      name,
      comment,
      has_history,
      is_clean,
      has_fuel,
      circulation_card,
      light,
      date_mod,
      user_mod,
      active
      )
      VALUES(
      @Id_mileage,
      @Id_vehicle,
      @Id_fuel_type,
      @mileage_date,
      @mileage_current,
      @name,
      @comment,
      @has_history,
      @is_clean,
      @has_fuel,
      @circulation_card,
      @light,
      @date_mod,
      @user_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_mileage A 
      WHERE A.Id_mileage = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_mileage OFF
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
    A.Id_fuel_type = @Id_fuel_type,
    A.mileage_date = @mileage_date,
    A.mileage_current = @mileage_current,
    A.name = @name,
    A.comment = @comment,
    A.has_history = @has_history,
    A.is_clean = @is_clean,
    A.has_fuel = @has_fuel,
    A.circulation_card = @circulation_card,
    A.light = @light,
    A.date_mod = @date_mod,
    A.user_mod = @user_mod,
    A.active = @active
    FROM tbl_ad_mileage A
    WHERE A.Id_mileage = @Id_mileage
    
    SELECT A.* FROM tbl_ad_mileage A 
    WHERE A.Id_mileage = @Id_mileage
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_mileage
    WHERE Id_mileage = @Id_mileage
    
    SELECT @Id_mileage Id_mileage
  END
  
SET NOCOUNT OFF
